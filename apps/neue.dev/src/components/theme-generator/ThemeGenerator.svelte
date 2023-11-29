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

  // Local data
  import { storeThemeOptions, storeColorResults } from './data'
  import { intensityMap, surfaceMap } from './data/settings'

  // Types
  import type { ColorsCollection } from './types'

  // Svelte related
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  // Import color utils by type
  const { useGetConvertedColor, useGetColorValue, useGenerateColor, useColorSchemes } = colorUtils

  // Get Converted Color Funcs
  const { getRgbString, getHueFromHex } = useGetConvertedColor()

  // Get Color Value Funcs
  const {
    generateA11yOnColor,
    generateDarkenedValue,
    generateLightenedValue,
    generateRandomColor,
    generateColorFromHSL,
  } = useGenerateColor()

  const { getSaturation } = useGetColorValue()

  // Get Color Scheme Funcs
  const { generateTriadColors, generateSplitComplimentaryColors, generateAnalogousColors } = useColorSchemes()

  // Collection of colors to use for theme generation/options
  const colorsCollectionStore = writable<ColorsCollection>({
    primary: null,
    secondary: null,
    tertiary: null,
  })

  const colorSchemeStore = writable('triad')

  // Color options
  let primaryColorHex: string = '#4e7fef'
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
  let buttonRoundLevel = '--ui-rounded'
  let inputRoundLevel = '--ui-rounded'
  // Previews
  let previewCSSVars = ''
  let themeOptsJsInCSS = ''
  // Errors
  let hashErrorMessage = ''

  // Make stores available to context so they can be injected locally as needed in child components.
  setContext('colorSchemeStore', colorSchemeStore)
  setContext('colorsCollectionStore', colorsCollectionStore)

  // Derived values

  $: {
    if (selectedSurfaceLevel || primaryColorHex) {
      generateThemeOpts()
    }
  }

  // Handles random color generation on correct keypress sequence.
  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
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

  // Hanlde surface relationship changed.
  function handleSurfaceRelationshipChange(event: CustomEvent) {
    selectedSurfaceLevel = event.detail.selectedSurfaceLevel

    generateThemeOpts()
  }

  // Handle Gray Hue changed.
  function handleGrayHueChange(event) {
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
    console.log('called generateThemeOpts')
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

    let allColorShades = []

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

    storeColorResults.set(allColorShades)

    $storeThemeOptions.derivedColors.forEach((color) => {
      if (color.hex === '') return
      const colorShades = buildColorShades(color)

      storeColorResults.update((results) => {
        return [...results, ...colorShades]
      })
    })

    builtResults = buildColorCSSStrings('color', 'rgb')
    previewCSSVars = builtResults.cssVars
    themeOptsJsInCSS = builtResults.jsInCSS
    const { btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs } = calcBtnCSSStrings()
    builtResults = buildBtnCSSStrings(btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs)

    previewCSSVars += builtResults.cssVars
    themeOptsJsInCSS += builtResults.jsInCSS
    builtResults = buildUICSSStrings()

    previewCSSVars += builtResults.cssVars
    themeOptsJsInCSS += builtResults.jsInCSS

    previewCSSVars = `<style>\n:root { \n ${previewCSSVars}  }</style>`
  }

  // Update collection for theme options.
  function updateColorsCollection() {
    colorsCollectionStore.update((colorsCollection) => {
      let baseColors = []
      // Array because we will have multi gray options later.
      const grays = []
      const hue = getHueFromHex(primaryColorHex)
      const baseSaturation = getSaturation(primaryColorHex)
      const newSaturation = baseSaturation > 0.79 ? baseSaturation : baseSaturation + 0.2

      // Create Colors used in every color scheme
      colorsCollection['error'] = generateColorFromHSL(centers.red, newSaturation, 0.5)
      colorsCollection['warning'] = generateColorFromHSL(centers.yellow, newSaturation, 0.5)
      colorsCollection['success'] = generateColorFromHSL(centers.green, newSaturation, 0.5)
      colorsCollection['neutral'] = grays[0] = generateColorFromHSL(hue, grayHue, 0.5)

      colorsCollection['page'] = generateLightenedValue(grays[0], surfaceMap[selectedSurfaceLevel].page)
      colorsCollection['surface'] = generateLightenedValue(grays[0], surfaceMap[selectedSurfaceLevel].surface)
      colorsCollection['surface-raised'] = generateLightenedValue(grays[0], surfaceMap[selectedSurfaceLevel].raised)

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

  // Build CSSVars and Options JS - Color
  function buildColorCSSStrings(prefix: string, type: string) {
    let cssVars = ''
    let jsInCSS = 'export const color = { \n'

    const types = {
      rgb: (rgb: string) => {
        return `rgba(${rgb}, 1)`
      },
    }

    $storeColorResults.forEach((element) => {
      if (element.level) {
        cssVars += `--${prefix}-${element.key}-${element.level}: ${types[type](element.rgb)};`
        jsInCSS += `'${element.key}-${element.level}': '${types[type](element.rgb)}',`
      } else {
        cssVars += `--${prefix}-${element.key}: ${types[type](element.rgb)};`
        jsInCSS += `'${element.key}': '${types[type](element.rgb)}',`
      }
      cssVars += '\n'
      jsInCSS += '\n'
    })
    jsInCSS += '} \n'

    return { cssVars, jsInCSS }
  }

  // Calculations for button sizes.
  function calcBtnCSSStrings() {
    const smBtnSizeScale = 1 - btnSizeScale
    const lgBtnSizeScale = 1 + btnSizeScale
    const chipBtnSizeScale = 1 - (btnSizeScale + 0.3)
    const btnPaddingWidth = btnPaddingBase * btnPaddingWidthScale

    const smBtnPaddingBase = btnPaddingBase * smBtnSizeScale
    const smBtnPaddingWidth = btnPaddingWidth * smBtnSizeScale

    const smBtnCalcs = {
      smBtnPaddingBase,
      smBtnPaddingWidth,
    }
    const lgBtnPaddingBase = btnPaddingBase * lgBtnSizeScale
    const lgBtnPaddingWidth = btnPaddingWidth * lgBtnSizeScale

    const lgBtnCalcs = {
      lgBtnPaddingBase,
      lgBtnPaddingWidth,
    }

    const chipBtnPaddingBase = btnPaddingBase * chipBtnSizeScale <= 0.1 ? 0.1 : btnPaddingBase * chipBtnSizeScale
    const chipBtnPaddingWidth = btnPaddingWidth * chipBtnSizeScale <= 0.3 ? 0.3 : btnPaddingWidth * chipBtnSizeScale

    const chipBtnCalcs = {
      chipBtnPaddingBase,
      chipBtnPaddingWidth,
    }

    return { btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs }
  }

  //Build CSSVars and Options JS - Buttons
  function buildBtnCSSStrings(
    btnPaddingWidth: number,
    smBtnCalcs: Record<string, number>,
    lgBtnCalcs: Record<string, number>,
    chipBtnCalcs: Record<string, number>,
  ) {
    let cssVars = ''
    let jsInCSS = 'export const btn = { \n'
    cssVars += `--btn-p-sm: ${smBtnCalcs.smBtnPaddingBase}rem ${smBtnCalcs.smBtnPaddingWidth}rem;\n`

    jsInCSS += `'p-sm': '${smBtnCalcs.smBtnPaddingBase}rem ${smBtnCalcs.smBtnPaddingWidth}rem',\n`

    cssVars += `--btn-p-base: ${btnPaddingBase}rem ${btnPaddingWidth}rem;\n`

    jsInCSS += `'p-base': '${btnPaddingBase}rem ${btnPaddingWidth}rem',\n`

    cssVars += `--btn-p-lg: ${lgBtnCalcs.lgBtnPaddingBase}rem ${lgBtnCalcs.lgBtnPaddingWidth}rem;\n`

    jsInCSS += `'p-lg': '${lgBtnCalcs.lgBtnPaddingBase}rem ${lgBtnCalcs.lgBtnPaddingWidth}rem,'\n}\n`

    cssVars += `--chip-p: ${chipBtnCalcs.chipBtnPaddingBase}rem ${chipBtnCalcs.chipBtnPaddingWidth}rem;\n`

    jsInCSS += `'chip-p': '${chipBtnCalcs.chipBtnPaddingBase}rem ${chipBtnCalcs.chipBtnPaddingWidth}rem,'\n}\n`
    return { cssVars, jsInCSS }
  }

  // Build CSSVars and Options JS - UI Options
  function buildUICSSStrings() {
    let cssVars = ''
    let jsInCSS = 'export const ui = { \n'
    if (roundedSize === 'none') {
      cssVars += `--ui-rounded: 0px;\n`
      jsInCSS += `'rounded': '0px'\n}\n`
      cssVars += `--ui-button-roundness: 0px;\n`
      jsInCSS += `'button-roundness': '0px'\n}\n`
    } else {
      cssVars += `--ui-rounded: var(${roundedSize});\n`
      jsInCSS += `'rounded': 'var(${roundedSize})'\n}\n`
      cssVars += `--ui-button-roundness: var(${buttonRoundLevel});\n`
      jsInCSS += `'button-roundness': 'var(${buttonRoundLevel})'\n}\n`
      cssVars += `--ui-input-roundness: var(${inputRoundLevel});\n`
      jsInCSS += `'input-roundness': 'var(${inputRoundLevel})'\n}\n`
    }

    return { cssVars, jsInCSS }
  }

  // Build Shades.
  function buildColorShades(color: any) {
    const hexValidation = new RegExp(/^#[0-9a-f]{6}$/i)

    if (!hexValidation.test(color.hex)) color.hex = '#CCCCCC'

    const hex500 = `#${color.hex}`.replace('##', '#')

    const response: any[] = [
      { key: color.key, level: 'base', hex: hex500, rgb: getRgbString(hex500), on: generateA11yOnColor(hex500) },
    ]

    ;['light', 'mlt', 'mdk', 'dark'].forEach((level) => {
      const hex =
        level.includes('light') || level.includes('mlt')
          ? generateLightenedValue(color.hex, intensityMap[level])
          : generateDarkenedValue(color.hex, intensityMap[level])

      response.push({
        key: color.key,
        level,
        hex,
        rgb: getRgbString(hex as string),
        on: generateA11yOnColor(hex),
      })
    })

    return response
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>{@html previewCSSVars}</svelte:head>

<div class="space-y-4">
  <section class="page-section">
    <h2 class="text-6xl page-heading">Color Generator</h2>
    <div class="flex flex-col items-center space-y-4">
      <p class="w-2/3 text-sm text-center leading-[1.25rem]">
        <span class="hidden md:inline">Press Ctrl (or Windows Key) + space to generate a random color. </span>Enter a
        hex code or click to pick a hex code.
      </p>
      <button on:click={generateRandomHexValue} class="btn-md">Random Color</button>
      <ColorPicker colorHex={primaryColorHex} on:colorChange={handleColorPickerChange} />
      <p class="text-xl text-error">{hashErrorMessage}</p>
      <ChipOptions />
      <button class="btn-md" on:click={generateThemeOpts}>Generate Preview</button>
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">Colors</h3>
    <div class="space-y-4">
      <div class="pb-4">
        {#each $storeThemeOptions.colors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
          <div
            class="grid grid-cols-1 md:grid-cols-[200px_1fr_240px] gap-2 md:gap-4 border-b-4 md:border-0 border-gray-100 md:pb-2 pb-4"
          >
            <ControlsLead hex={colorRow.hex} label={colorRow.label} />
            <Swatch color={colorRow.key} stops={colorRow.stops.split(',')} />
            <ControlsTrail colorOn={colorRow.on} stops={colorRow.stops} colorsIndex={i} />
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
        <RoundedMaker on:roundedOptsChange={handleRoundedOptsChange} {roundedSize} />
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
  :global(input.nested-input) {
    box-shadow: none !important;
    border: none !important;
  }
  .page-section {
    @apply p-4 rounded bg-surface-base;
  }
  .page-heading {
    @apply font-bold text-center pb-4 text-secondary-base;
  }
  .page-subheading {
    @apply font-bold text-center;
  }
  :global(.page-subheading) {
    @apply text-xl font-bold text-center;
  }
  .section-box {
    @apply p-4 border-4 rounded;
  }
</style>
