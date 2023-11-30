<script lang="ts">
  // Local components
  // Colors
  import ChipOptions from './partials/ChipOptions.svelte'
  import ColorPicker from './partials/ColorPicker.svelte'
  import ControlsLead from './partials/ControlsLead.svelte'
  import ControlsTrail from './partials/ControlsTrail.svelte'
  import Swatch from './partials/Swatch.svelte'
  import SurfaceRelationships from './partials/SurfaceRelationships.svelte'

  // Other Theme Opt Components
  import ButtonMaker from './partials/ButtonMaker.svelte'
  import RoundedMaker from './partials/RoundedMaker.svelte'

  // Local Helpers
  import { colorUtils, centers } from './helpers'
  import { buildColorStrings, buildBtnStrings, buildUIStrings, buildColorShades } from './helpers/stringBuilders'

  // Local data
  import { storeThemeOptions, colorResultsStore } from './data'
  import { surfaceMap } from './data/settings'

  // Types
  import type { ColorsCollection, ColorSettings } from './types'

  // Svelte related
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  // Import color utils by type
  const { useGetConvertedColor, useGetColorValue, useGenerateColor, useColorSchemes } = colorUtils

  // Get Converted Color Funcs
  const { getHueFromHex } = useGetConvertedColor()

  // Get Color Value Funcs
  const { generateLightenedValue, generateDarkenedValue, generateRandomColor, generateColorFromHSL } =
    useGenerateColor()

  const { getSaturation } = useGetColorValue()

  // Get Color Scheme Funcs
  const { generateTriadColors, generateSplitComplimentaryColors, generateAnalogousColors } = useColorSchemes()

  // Collection of colors to use for theme generation/options
  const colorsCollectionStore = writable<ColorsCollection>({
    primary: null,
    secondary: null,
    tertiary: null,
  })

  const colorSchemeStore = writable('analogous-triad')

  // Color options
  let primaryColorHex: string = '#ef4953'
  let selectedSurfaceLevel: string = 'low'
  let grayHue = 0.02
  // Button options
  let btnSizeScale = 0.2
  let btnPaddingWidthScale: number = 3
  let btnPaddingBase: number = 0.5
  let btnFontSizes = {
    sm: 'sm',
    base: 'base',
    lg: 'lg',
  }
  // Rounded options
  let roundedSize = '--radius-md'
  let buttonRoundLevel = '--radius-full'
  let inputRoundLevel = '--radius-full'
  // Previews
  let previewCSSVars = ''
  let themeOptsJsInCSS = ''
  // Errors
  let hashErrorMessage = ''

  // Make stores available to context so they can be injected locally as needed in child components.
  setContext('colorSchemeStore', colorSchemeStore)
  setContext('colorsCollectionStore', colorsCollectionStore)

  // Handles random color generation on correct keypress sequence.
  function handleKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.code === 'Space') {
      generateRandomHexValue()
    }
  }

  // Color changed from color picker.
  function handleColorPickerChange(event: CustomEvent) {
    // comes from user input and may not include valid #.
    if (event?.detail.charAt(0) !== '#') {
      hashErrorMessage = 'Invalid color format. Hex code must start with #.'
      return
    }
    if (hashErrorMessage.length) hashErrorMessage = ''
    if (event?.detail.length === 7) {
      primaryColorHex = event?.detail
    }
  }

  // Handle Button Opts changed.
  function handleBtnOptsChange(event: CustomEvent) {
    btnPaddingBase = event.detail.btnPaddingBase
    btnFontSizes = event.detail.btnFontSizes
    btnPaddingWidthScale = event.detail.btnPaddingWidthScale
    btnSizeScale = event.detail.btnSizeScale

    generateThemeOpts()
  }

  // Handle surface relationship changed.
  function handleSurfaceRelationshipChange(event: CustomEvent) {
    selectedSurfaceLevel = event.detail.selectedSurfaceLevel

    generateThemeOpts()
  }

  // Handle Gray Hue changed.
  function handleGrayHueChange(event: CustomEvent) {
    grayHue = parseFloat(event.detail.grayHue)

    generateThemeOpts()
  }

  // Handle Rounded Opts changed.
  function handleRoundedOptsChange(event: CustomEvent) {
    roundedSize = event.detail.roundedSize
    buttonRoundLevel = event.detail.buttonRoundLevel
    inputRoundLevel = event.detail.inputRoundLevel

    generateThemeOpts()
  }

  // Random Hex generated for color scheme genration.
  function generateRandomHexValue() {
    primaryColorHex = generateRandomColor() as string
  }

  // Generate colors: create colors collection, fill in template options from colors collection, build UI options as outputted strings for preview and themes.
  function generateThemeOpts() {
    updateColorsCollection()
    let builtResults

    storeThemeOptions.update((currentOptions) => {
      return {
        ...currentOptions,
        colors: currentOptions.colors.map((color, i) => {
          if ($colorsCollectionStore[color.key]) {
            if ($colorsCollectionStore[color.key] !== '') {
              color.hex = $colorsCollectionStore[color.key] as string
            }

            return color
          } else {
            color.hex = ''
            return color
          }
        }),
        derivedColors: currentOptions.derivedColors.map((color, i) => {
          if ($colorsCollectionStore[color.key]) {
            if ($colorsCollectionStore[color.key] !== null) {
              color.hex = $colorsCollectionStore[color.key] as string
            }
            return color
          } else {
            color.hex = ''
            return color
          }
        }),
      }
    })

    let allColorShades: ColorSettings[] = []

    $storeThemeOptions.colors.forEach((color) => {
      if (color.hex !== '') {
        const colorShades = buildColorShades(color)
        allColorShades = [...allColorShades, ...colorShades]
      }
    })

    $storeThemeOptions.derivedColors.forEach((color) => {
      if (color.hex !== '') {
        const colorShades = buildColorShades(color)
        allColorShades = [...allColorShades, ...colorShades]
      }
    })

    colorResultsStore.set(allColorShades)

    $storeThemeOptions.derivedColors.forEach((color) => {
      if (color.hex === '') return
      const colorShades = buildColorShades(color)

      colorResultsStore.update((results) => {
        return [...results, ...colorShades]
      })
    })

    // Color Strings

    console.log($colorResultsStore)

    builtResults = buildColorStrings($colorResultsStore, 'color', 'rgb')
    previewCSSVars = builtResults.cssVars
    themeOptsJsInCSS = builtResults.jsInCSS

    // Calcs
    const { btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs } = calcBtnCSSStrings()

    // Btn strings
    builtResults = buildBtnStrings(btnPaddingBase, btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs)
    previewCSSVars += builtResults.cssVars
    themeOptsJsInCSS += builtResults.jsInCSS

    // Ui strings
    builtResults = buildUIStrings(roundedSize, buttonRoundLevel, inputRoundLevel)
    previewCSSVars += builtResults.cssVars
    themeOptsJsInCSS += builtResults.jsInCSS

    previewCSSVars = `<style>\n:root { \n ${previewCSSVars}  }</style>`
  }

  // Update collection for theme options.
  function updateColorsCollection() {
    colorsCollectionStore.update((colorsCollection) => {
      let baseColors: (string | null)[] = []
      // Array because we will have multi gray options later.
      const grays = []
      const hue = getHueFromHex(primaryColorHex)
      const baseSaturation = getSaturation(primaryColorHex)
      const newSaturation = baseSaturation > 0.79 ? baseSaturation : baseSaturation + 0.2

      // Create Colors used in every color scheme.
      colorsCollection['error'] = generateColorFromHSL(centers.red, newSaturation, 0.5)
      colorsCollection['warning'] = generateColorFromHSL(centers.yellow, newSaturation, 0.5)
      colorsCollection['success'] = generateColorFromHSL(centers.green, newSaturation, 0.5)
      colorsCollection['neutral'] = grays[0] = generateColorFromHSL(hue, grayHue, 0.5)
      // Surface colors.
      colorsCollection['page'] = generateLightenedValue(grays[0] as string, surfaceMap[selectedSurfaceLevel].page)
      colorsCollection['surface'] = generateLightenedValue(grays[0] as string, surfaceMap[selectedSurfaceLevel].surface)
      colorsCollection['surface-raised'] = generateLightenedValue(
        grays[0] as string,
        surfaceMap[selectedSurfaceLevel].raised,
      )

      colorsCollection['page-contrast'] = generateDarkenedValue(
        grays[0] as string,
        surfaceMap[selectedSurfaceLevel].page,
      )
      colorsCollection['surface-contrast'] = generateDarkenedValue(
        grays[0] as string,
        surfaceMap[selectedSurfaceLevel].surface,
      )
      colorsCollection['surface-raised-contrast'] = generateDarkenedValue(
        grays[0] as string,
        surfaceMap[selectedSurfaceLevel].raised,
      )

      const createPrimaries = () => {
        colorsCollection['primary'] = primaryColorHex
        colorsCollection['secondary'] = baseColors[0]
        colorsCollection['tertiary'] = baseColors[1]
      }

      // Individual differences in color schemes.
      switch ($colorSchemeStore) {
        case 'triad':
          baseColors = generateTriadColors(primaryColorHex)
          createPrimaries()
          colorsCollection['quaternary'] = ''
          colorsCollection['quinary'] = ''
          break
        case 'split-complimentary':
          baseColors = generateSplitComplimentaryColors(primaryColorHex)
          createPrimaries()
          colorsCollection['quaternary'] = ''
          colorsCollection['quinary'] = ''
          break
        case 'analogous-triad':
          baseColors = generateAnalogousColors(primaryColorHex, 40, 'analogous-triad')
          createPrimaries()
          colorsCollection['quaternary'] = ''
          colorsCollection['quinary'] = ''
          break
        case 'analogous-quad':
          baseColors = generateAnalogousColors(primaryColorHex, 40, 'analogous-quad')
          createPrimaries()
          colorsCollection['quaternary'] = baseColors[2]
          colorsCollection['quinary'] = ''
          break
        case 'analogous-quin':
          baseColors = generateAnalogousColors(primaryColorHex, 20, 'analogous-quin')
          createPrimaries()
          colorsCollection['quaternary'] = baseColors[2]
          colorsCollection['quinary'] = baseColors[3]
          break
        default:
          baseColors = generateTriadColors(primaryColorHex)
          createPrimaries()
          colorsCollection['quaternary'] = ''
          colorsCollection['quinary'] = ''
          break
      }

      return colorsCollection
    })
  }

  // Calculations for button sizes.
  function calcBtnCSSStrings() {
    const smBtnSizeScale = 1 - btnSizeScale
    const lgBtnSizeScale = 1 + btnSizeScale
    const chipBtnSizeScale = 1 - (btnSizeScale + 0.3)
    const btnPaddingWidth = btnPaddingBase * btnPaddingWidthScale

    // Small Btns
    const smBtnPaddingBase = btnPaddingBase * smBtnSizeScale
    const smBtnPaddingWidth = btnPaddingWidth * smBtnSizeScale

    const smBtnCalcs = {
      smBtnPaddingBase,
      smBtnPaddingWidth,
    }

    // Large Btns
    const lgBtnPaddingBase = btnPaddingBase * lgBtnSizeScale
    const lgBtnPaddingWidth = btnPaddingWidth * lgBtnSizeScale

    const lgBtnCalcs = {
      lgBtnPaddingBase,
      lgBtnPaddingWidth,
    }

    // Chips
    const chipBtnPaddingBase = btnPaddingBase * chipBtnSizeScale <= 0.1 ? 0.1 : btnPaddingBase * chipBtnSizeScale
    const chipBtnPaddingWidth = btnPaddingWidth * chipBtnSizeScale <= 0.3 ? 0.3 : btnPaddingWidth * chipBtnSizeScale

    const chipBtnCalcs = {
      chipBtnPaddingBase,
      chipBtnPaddingWidth,
    }

    return { btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>{@html previewCSSVars}</svelte:head>

<div class="container p-4 space-y-4">
  <section class="p-8">
    <h2 class="text-6xl page-heading">Color Generator</h2>
    <div class="flex flex-col items-center space-y-4">
      <p class="w-2/3 text-sm text-center leading-[1.25rem]">
        <span class="hidden md:inline">Press Ctrl (or Windows Key) + space to generate a random color. </span>Enter a
        hex code or click to pick a hex code.
      </p>
      <button on:click={generateRandomHexValue} class="my-btn btn-md">Random Color</button>
      <ColorPicker colorHex={primaryColorHex} on:colorChange={handleColorPickerChange} />
      <p class="text-xl text-error">{hashErrorMessage}</p>
      <ChipOptions />
      <button class="btn-md my-btn" on:click={generateThemeOpts}>Generate Preview</button>
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">Colors</h3>
    <div class="space-y-4">
      <div class="pb-2">
        {#each $storeThemeOptions.colors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
          <div
            class="grid grid-cols-1 md:grid-cols-[200px_1fr_240px] gap-2 md:gap-4 border-b-2 md:border-0 border-neutral-mlt md:pb-2 pb-2"
          >
            <ControlsLead hex={colorRow.hex} label={colorRow.label} />
            <Swatch color={colorRow.key} stops={colorRow?.stops?.split(',')} />
            <ControlsTrail colorOn={colorRow.on} stops={colorRow.stops ?? ''} colorsIndex={i} />
          </div>
        {/each}
      </div>

      <h4 class="page-subheading">Surface and hue relationships.</h4>
      <SurfaceRelationships
        {selectedSurfaceLevel}
        {grayHue}
        on:surfaceRelationshipsChange={handleSurfaceRelationshipChange}
        on:grayHueChange={handleGrayHueChange}
      />
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">UI Options</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="section-box">
        <RoundedMaker
          on:roundedOptsChange={handleRoundedOptsChange}
          {roundedSize}
          {buttonRoundLevel}
          {inputRoundLevel}
        />
      </div>
      <div class="section-box"><p>Shadows here</p></div>
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">Elements</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="section-box">
        <ButtonMaker {btnSizeScale} {btnPaddingBase} {btnPaddingWidthScale} on:btnOptsChange={handleBtnOptsChange} />
      </div>
      <div class="section-box"><p>Inputs here</p></div>
    </div>
  </section>

  <pre><code class="language-javascript">{themeOptsJsInCSS}</code></pre>
</div>

<style lang="postcss">
  /* only use when nested with a parent with an outline indicator as this removes visual que for accessibility otherwise */
</style>
