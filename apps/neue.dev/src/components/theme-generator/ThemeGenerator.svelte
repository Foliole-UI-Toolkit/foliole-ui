<script lang="ts">
  // Local components
  // Colors
  import ChipOptions from './partials/ChipOptions.svelte'
  import ColorPicker from './partials/ColorPicker.svelte'
  import ControlsLead from './partials/ControlsLead.svelte'
  import ControlsTrail from './partials/ControlsTrail.svelte'
  import Swatch from './partials/Swatch.svelte'
  // Other Theme Opt Components
  import ButtonMaker from './partials/ButtonMaker.svelte'
  import RoundedMaker from './partials/RoundedMaker.svelte'

  // Local Helpers
  import { colorUtils, centers } from './helpers'

  // Local data
  import { storeThemeOptions, storeColorResults } from './data'
  import { singleSwatchColorClasses, intensityMap } from './data/settings'

  // Types
  import type { ColorsCollection } from './types'

  // Svelte related
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'

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
  let primaryColorHex: string = '#FF007F'
  // Button options
  let btnPaddingSizeScale: number = 40
  let btnPaddingWidthScale: number = 3
  let btnPaddingBase: number = 0.5
  let btnFontSizes = {
    sm: 'sm',
    base: 'base',
    lg: 'lg',
  }
  // Rounded options
  let roundedSize = '8px'
  // Previews
  let previewCSSVars = ''
  let themeOptsJsInCSS = ''
  // Errors
  let hashErrorMessage = ''

  // Make stores available to context so they can be injected locally as needed in child components.
  setContext('colorSchemeStore', colorSchemeStore)
  setContext('colorsCollectionStore', colorsCollectionStore)

  // Handles random color generation on correct keypress sequence.
  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
      generateRandomHexValue()
    }
  }

  // Color has been changed from color picker
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

  // Button Opts have been changed from controls.
  function handleBtnOptsChange(event: CustomEvent) {
    btnPaddingBase = event.detail.btnPaddingBase
    btnFontSizes = event.detail.btnFontSizes
    btnPaddingSizeScale = event.detail.btnPaddingSizeScale
    btnPaddingWidthScale = event.detail.btnPaddingWidthScale

    generateThemeOpts()
  }

  // Rounded Opts have been changed from controls.
  function handleRoundedOptsChange(event: CustomEvent) {
    roundedSize = event.detail.roundedSize

    generateThemeOpts()
  }

  // Random Hex as jumping off point to color scheme genration.
  function generateRandomHexValue() {
    primaryColorHex = generateRandomColor() as string
  }

  // Generate colors: create colors collection, fill in template options from colors collection and data output as string
  function generateThemeOpts() {
    updateColorsCollection()
    console.log($colorsCollectionStore)
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

    $storeThemeOptions.colors.forEach((color) => {
      if (color.hex === '') return
      const colorShades = buildColorShades(color)

      storeColorResults.update((results) => {
        return [...results, ...colorShades]
      })
    })

    $storeThemeOptions.derivedColors.forEach((color) => {
      if (color.hex === '') return
      const colorShades = buildColorShades(color)

      storeColorResults.update((results) => {
        return [...results, ...colorShades]
      })
    })

    console.log($storeThemeOptions.derivedColors)
    console.log($storeColorResults)

    builtResults = buildColorCSSStrings('color', 'rgb')
    previewCSSVars = builtResults.cssVars
    themeOptsJsInCSS = builtResults.jsInCSS
    builtResults = buildButtonCSSStrings()

    previewCSSVars += builtResults.cssVars
    themeOptsJsInCSS += builtResults.jsInCSS
    builtResults = buildUICSSStrings()

    previewCSSVars += builtResults.cssVars
    themeOptsJsInCSS += builtResults.jsInCSS

    previewCSSVars = `<style>\n:root { \n ${previewCSSVars}  }</style>`
  }

  // build CSSVars and Options JS
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
  // build CSSVars and Options JS
  function buildButtonCSSStrings() {
    const btnPaddingSizeScalePercent = btnPaddingSizeScale / 100
    const btnPaddingIncreased = btnPaddingBase + btnPaddingBase * btnPaddingSizeScalePercent
    const btnPaddingDecreased = btnPaddingBase - btnPaddingBase * btnPaddingSizeScalePercent
    const btnPaddingWidthDecreased = btnPaddingBase * btnPaddingWidthScale
    const btnPaddingWidth = btnPaddingBase * btnPaddingWidthScale
    const btnPaddingWidthIncreased = btnPaddingBase * btnPaddingWidthScale

    let cssVars = ''
    let jsInCSS = 'export const btn = { \n'
    cssVars += `--btn-p-sm: ${btnPaddingDecreased}rem ${btnPaddingWidthDecreased}rem;\n`

    jsInCSS += `'p-sm': '${btnPaddingDecreased}rem ${btnPaddingWidthDecreased}rem',\n`

    cssVars += `--btn-p-base: ${btnPaddingBase}rem ${btnPaddingWidth}rem;\n`

    jsInCSS += `'p-base': '${btnPaddingBase}rem ${btnPaddingWidth}rem',\n`

    cssVars += `--btn-p-lg: ${btnPaddingIncreased}rem; ${btnPaddingWidthIncreased}rem;\n`

    jsInCSS += `'p-lg': '${btnPaddingIncreased}rem ${btnPaddingWidthIncreased}rem'\n}\n`
    return { cssVars, jsInCSS }
  }
  // build CSSVars and Options JS
  function buildUICSSStrings() {
    let cssVars = ''
    let jsInCSS = 'export const ui = { \n'
    cssVars += `--ui-rounded: ${roundedSize};\n`

    jsInCSS += `'rounded': '${roundedSize}'\n}\n`

    return { cssVars, jsInCSS }
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
      colorsCollection['neutral'] = grays[0] = generateColorFromHSL(hue, 0.03, 0.5)
      // colorsCollection['neutral'] = grays[0] = generateColorFromHSL(hue, 0.0, 0.5)
      // colorsCollection['page'] = generateLightenedValue(grays[0], 2.5)
      // colorsCollection['surface'] = generateLightenedValue(grays[0], 2.3)
      // colorsCollection['surface-raised'] = generateLightenedValue(grays[0], 2.1)
      colorsCollection['page'] = generateLightenedValue(grays[0], 2.6)
      colorsCollection['surface'] = generateLightenedValue(grays[0], 2.4)
      colorsCollection['surface-raised'] = generateLightenedValue(grays[0], 2.1)
      // colorsCollection['page'] = generateLightenedValue(grays[0], 3)
      // colorsCollection['surface'] = generateLightenedValue(grays[0], 2.5)
      // colorsCollection['surface-raised'] = generateLightenedValue(grays[0], 2.25)

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
          baseColors = generateAnalogousColors(primaryColorHex, 20, 'analogous-triad')
          createPrimaries()
          colorsCollection['quaternary'] = ''
          colorsCollection['quinary'] = ''
          break
        case 'analogous-quad':
          baseColors = generateAnalogousColors(primaryColorHex, 20, 'analogous-quad')
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

  // Build Shades to make Pollen configs.
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

  onMount(() => {
    generateThemeOpts()
  })
</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>{@html previewCSSVars}</svelte:head>

<div class="space-y-2 page-one-col">
  <section class="flex flex-col items-center gap-2 p-4 rounded bg-surface-base lg:gap-4">
    <h2 class="text-center page-header">Color Generator</h2>

    <p class="w-2/3 text-center leading-[1.25rem]">
      <span class="hidden md:inline">Press Ctrl (or Windows Key) + space to generate a random color. </span>Enter a hex
      code or click to pick a hex code.
    </p>
    <button on:click={generateRandomHexValue} class="btn-neue btn-base">Random Color</button>
    <ColorPicker colorHex={primaryColorHex} on:colorChange={handleColorPickerChange} />
    <p class="text-xl text-error">{hashErrorMessage}</p>
    <ChipOptions />
    <button class="btn-neue btn-base" on:click={generateThemeOpts}>Generate Preview</button>
  </section>
  <section>
    <h3 class="text-2xl uppercase">Colors</h3>
    <div class="grid grid-cols-1">
      {#each $storeThemeOptions.colors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
        <div class="pb-2">
          <div
            class="grid grid-cols-1 md:grid-cols-[200px_1fr_240px] gap-2 md:gap-4 border-b-4 md:border-0 border-gray-100 pb-2"
          >
            <ControlsLead hex={colorRow.hex} label={colorRow.label} />
            <Swatch color={colorRow.key} stops={colorRow.stops.split(',')} />
            <ControlsTrail colorOn={colorRow.on} stops={colorRow.stops} colorsIndex={i} />
          </div>
        </div>
      {/each}

      <!-- {#each $storeThemeOptions.derivedColors.filter((colorRow) => colorRow.hex !== '') as colorRow, i} -->
      <div
        class="flex flex-col items-center justify-center w-full m-4 p-4 border-2 border-neutral-base rounded {singleSwatchColorClasses[
          'page'
        ].base}"
      >
        <span class="pb-2">Background color: ---color-page-base</span>
        <div class="text-center w-1/2 p-2 rounded {singleSwatchColorClasses['surface'].base}">
          Element background color : --color-surface-base
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-center w-full m-4 p-4 border-2 border-neutral-base rounded {singleSwatchColorClasses[
          'surface'
        ].base}"
      >
        <span class="flex pb-2">Background color: ---color-surface-base</span>
        <div class="text-center w-1/2 p-2 rounded {singleSwatchColorClasses['surface-raised'].base}">
          Element background color : --color-raised-surface-base
        </div>
      </div>
      <!-- {/each} -->
    </div>
  </section>
  <section>
    <h3 class="text-2xl uppercase">Elements</h3>
    <ButtonMaker
      {btnPaddingBase}
      {btnPaddingSizeScale}
      {btnPaddingWidthScale}
      {btnFontSizes}
      on:btnOptsChange={handleBtnOptsChange}
    />
  </section>
  <section><RoundedMaker on:roundedOptsChange={handleRoundedOptsChange} {roundedSize} /></section>

  <!-- <pre><code class="language-javascript">{themeOptsJsInCSS}</code></pre> -->
</div>

<style lang="postcss">
  /* only use when nested with a parent with an outline indicator as this removes visual que for accessibility otherwise */
  :global(input.nested-input) {
    box-shadow: none !important;
    border: none !important;
  }
</style>
