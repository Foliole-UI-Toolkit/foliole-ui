<script lang="ts">
  // Local components
  // Colors
  import ChipOptions from './partials/ChipOptions.svelte'
  import ColorPicker from './partials/ColorPicker.svelte'
  import ControlsLead from './partials/ControlsLead.svelte'
  import ControlsTail from './partials/ControlsTail.svelte'
  import Swatch from './partials/Swatch.svelte'
  import SurfaceRelationships from './partials/SurfaceRelationships.svelte'

  // Other Theme Opt Components
  import ButtonMaker from './partials/ButtonMaker.svelte'
  import RoundedMaker from './partials/RoundedMaker.svelte'

  import { centers, useColorSchemes, useGenerateColor, useGetColorValue, useGetConvertedColor } from './utilities'

  // Local Helpers
  import {
    buildBtnStrings,
    buildColorStrings,
    buildElBtnStrings,
    capJsInCSSString,
    buildUIRoundStrings,
    type BuiltResults,
  } from './helpers/stringBuilders'

  import { buildColorShades } from './helpers'

  // Local data
  import { setStoreThemeOptions } from './data'
  import { surfaceMap } from './data/settings'

  // Types
  import type { NeueAdditionalColorSchemesMapKeys, ColorsCollection, ColorSettings } from './types'

  // Svelte related
  import { onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Writable } from 'svelte/store'
  // Other
  import { localStorageStore } from '@skeletonlabs/skeleton'

  // Get Converted Color Funcs
  const { getHueFromHex } = useGetConvertedColor()

  const { getSaturation } = useGetColorValue()

  const { generateLightenedValue, generateDarkenedValue, generateRandomColor, generateColorFromHSL } =
    useGenerateColor()

  // Get Color Scheme Funcs
  const { generateTriadColors, generateSplitComplimentaryColors, generateAnalogousColors } = useColorSchemes()

  // Collection of colors to use for theme generation/options
  const colorsCollectionStore = writable<ColorsCollection>({
    primary: null,
    secondary: null,
    tertiary: null,
  })

  const colorSchemeStore = writable('analogous-triad')

  // Call a function to keep store from being global.
  // Not sure if this is necessary here but I prefer to default to avoiding globals.
  // Here I use this approach to get the large data object out of the file.
  const storeThemeOptions = setStoreThemeOptions()

  const additionalColorsStore: Writable<NeueAdditionalColorSchemesMapKeys> = localStorageStore('additionalColors', {})

  // Color options
  let primaryColorHex: string = '#ef4953'
  let selectedSurfaceLevel: string = 'low'
  let grayHue = 0.02
  // Button options
  let btnPaddingBase: number = 0.5
  let btnPaddingWidthScale: number = 3
  let btnSizeScale = 0.2
  let btnHoverScale = 0.98
  let btnActiveScale = 1.05
  let btnHoverBrightness = 95
  let btnActiveBrightness = 102
  let btnFontSmSize = '--font-scale-sm'
  let btnFontSize = '--font-scale-base'
  let btnFontLgSize = '--font-scale-lg'

  // Rounded options
  let roundedSize = '--border-radius-md'
  let buttonRoundLevel = '--border-radius-full'
  let inputRoundLevel = '--border-radius-full'

  // Errors
  let hashErrorMessage = ''

  let initialized = false
  // Cached String Results
  let builtSchemeColorString: BuiltResults = { cssVarsBuilt: '', jsInCSSBuilt: '', twVarsBuilt: '' }
  let builtDerivedColorString: BuiltResults = { cssVarsBuilt: '', jsInCSSBuilt: '', twVarsBuilt: '' }
  let builtBtnString: BuiltResults = { cssVarsBuilt: '', jsInCSSBuilt: '' }
  let builtUIRoundString: BuiltResults = { cssVarsBuilt: '', jsInCSSBuilt: '' }
  let builtElBtnString: BuiltResults = { cssVarsBuilt: '', jsInCSSBuilt: '' }

  // Previews
  $: previewCSSVars = ''
  $: themeOptsJsInCSS = ''

  $: {
    // once initialized, dynamically build strings for preview and user options with previous values.
    if (initialized) {
      let cssVars =
        builtSchemeColorString.cssVarsBuilt +
        builtDerivedColorString.cssVarsBuilt +
        builtBtnString.cssVarsBuilt +
        builtUIRoundString.cssVarsBuilt +
        builtElBtnString.cssVarsBuilt

      previewCSSVars = `<style>\n:root { \n ${cssVars}  }</style>`
      themeOptsJsInCSS =
        capJsInCSSString(builtSchemeColorString.jsInCSSBuilt + builtDerivedColorString.jsInCSSBuilt, 'color') +
        capJsInCSSString(builtSchemeColorString.jsInCSSBuilt + builtDerivedColorString.jsInCSSBuilt, 'tw') +
        builtBtnString.jsInCSSBuilt +
        capJsInCSSString(builtUIRoundString.jsInCSSBuilt, 'ui') +
        builtElBtnString.jsInCSSBuilt +
        capJsInCSSString(builtElBtnString.cssVarsBuilt, 'el')
    }
  }

  // Make stores available to context so they can be injected locally as needed in child components.
  setContext('colorSchemeStore', colorSchemeStore)
  setContext('colorsCollectionStore', colorsCollectionStore)
  setContext('primaryColorHex', primaryColorHex)
  setContext('additionalColorsStore', additionalColorsStore)

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
    generateColors()
  }

  // Handle controlsTailChange Opts changed.
  function handleTextColorChange(event: CustomEvent) {
    btnPaddingBase = event.detail.color
  }

  // Handle surface relationship changed.
  function handleSurfaceRelationshipChange(event: CustomEvent) {
    selectedSurfaceLevel = event.detail.selectedSurfaceLevel

    let updatedColors: any = {}

    updatedColors = generateDerivedColors(updatedColors)

    updateDerivedColors(updateColors)

    generateDerivedColorShades()
  }

  // Handle Gray Hue changed.
  function handleGrayHueChange(event: CustomEvent) {
    grayHue = parseFloat(event.detail.grayHue)

    let updatedColors: any = {}

    updatedColors = generateDerivedColors(updatedColors)

    updateDerivedColors(updateColors)
  }

  // Handle Button Opts changed.
  function handleBtnOptsChange(event: CustomEvent) {
    btnPaddingBase = event.detail.btnPaddingBase
    btnPaddingWidthScale = event.detail.btnPaddingWidthScale
    btnSizeScale = event.detail.btnSizeScale
    btnHoverScale = event.detail.btnHoverScale
    btnActiveScale = event.detail.btnActiveScale
    btnHoverBrightness = event.detail.btnHoverBrightness
    btnActiveBrightness = event.detail.btnActiveBrightness
    btnFontSmSize = event.detail.btnFontSmSize
    btnFontSize = event.detail.btnFontSize
    btnFontLgSize = event.detail.btnFontLgSize

    generateBtnStrings()
  }

  // Handle Rounded Opts changed.
  function handleRoundedOptsChange(event: CustomEvent) {
    roundedSize = event.detail.roundedSize
    buttonRoundLevel = event.detail.buttonRoundLevel
    inputRoundLevel = event.detail.inputRoundLevel

    builtUIRoundString = buildUIRoundStrings(roundedSize, buttonRoundLevel, inputRoundLevel)
  }

  // Update all colors
  function updateColors(updatedColors: any) {
    storeThemeOptions.update((currentOptions) => {
      return {
        ...currentOptions,
        colors: currentOptions.colors.map((color, i) => {
          color.hex = updatedColors[color.key] as string

          return color
        }),
        derivedColors: currentOptions.derivedColors.map((color, i) => {
          color.hex = updatedColors[color.key] as string

          return color
        }),
      }
    })
  }

  // Update derived colors only.
  function updateDerivedColors(updatedColors: any) {
    storeThemeOptions.update((currentOptions) => {
      return {
        ...currentOptions,
        derivedColors: currentOptions.derivedColors.map((color, i) => {
          color.hex = generateColorFromHSL(getHueFromHex(color.hex), grayHue, 0.5)

          return color
        }),
      }
    })
  }

  // Init, calculate and build Color Strings
  function generateBtnStrings() {
    const { btnPaddingWidth, smBtnCalcs, lgBtnCalcs, chipBtnCalcs } = calcBtnCSSStrings()
    // Btn strings
    let btnOpts = {
      btnPaddingBase,
      btnPaddingWidth,
      btnHoverScale,
      btnActiveScale,
      btnHoverBrightness,
      btnActiveBrightness,
      btnFontSmSize,
      btnFontSize,
      btnFontLgSize,
    }
    builtBtnString = buildBtnStrings(btnOpts, smBtnCalcs, lgBtnCalcs, chipBtnCalcs)
  }

  // Generate derived colors only.
  function generateDerivedColors(updatedColors: any) {
    // Surface colors.
    const hue = getHueFromHex(primaryColorHex)
    updatedColors['neutral'] = generateColorFromHSL(hue, grayHue, 0.5)
    updatedColors['page'] = generateLightenedValue(
      updatedColors['neutral'] as string,
      surfaceMap[selectedSurfaceLevel].page,
    )
    updatedColors['surface'] = generateLightenedValue(
      updatedColors['neutral'] as string,
      surfaceMap[selectedSurfaceLevel].surface,
    )
    updatedColors['surface-raised'] = generateLightenedValue(
      updatedColors['neutral'] as string,
      surfaceMap[selectedSurfaceLevel].raised,
    )
    updatedColors['page-contrast'] = generateDarkenedValue(
      updatedColors['neutral'] as string,
      surfaceMap[selectedSurfaceLevel].page,
    )
    updatedColors['surface-contrast'] = generateDarkenedValue(
      updatedColors['neutral'] as string,
      surfaceMap[selectedSurfaceLevel].surface,
    )
    updatedColors['surface-raised-contrast'] = generateDarkenedValue(
      updatedColors['neutral'] as string,
      surfaceMap[selectedSurfaceLevel].raised,
    )

    return updatedColors
  }

  // Generate color scheme based on base primary hex color.
  function generateColorScheme(updatedColors: Record<string, string | null>) {
    // colorsCollectionStore.update((colorsCollection) => {
    let baseColors: (string | null)[] = []
    // Array because we will have multi gray options later.
    const baseSaturation = getSaturation(primaryColorHex)
    const saturation = baseSaturation > 0.79 ? baseSaturation : baseSaturation + 0.2

    updatedColors['error'] = generateColorFromHSL(centers.red, saturation, 0.5)
    updatedColors['success'] = generateColorFromHSL(centers.green, saturation, 0.5)

    const createPrimaries = () => {
      updatedColors['primary'] = primaryColorHex
      updatedColors['secondary'] = baseColors[0]
      updatedColors['tertiary'] = baseColors[1]
    }

    // Individual differences in color schemes.
    if ($colorSchemeStore === 'triad') {
      baseColors = generateTriadColors(primaryColorHex)
      createPrimaries()
      updatedColors['quat'] = ''
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'split-complimentary') {
      baseColors = generateSplitComplimentaryColors(primaryColorHex)
      createPrimaries()
      updatedColors['quat'] = ''
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'analogous-triad') {
      baseColors = generateAnalogousColors(primaryColorHex, 40, 'analogous-triad')
      createPrimaries()
      updatedColors['quat'] = ''
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'analogous-quad') {
      baseColors = generateAnalogousColors(primaryColorHex, 40, 'analogous-quad')
      createPrimaries()
      updatedColors['quat'] = baseColors[2]
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'analogous-quin') {
      baseColors = generateAnalogousColors(primaryColorHex, 20, 'analogous-quin')
      createPrimaries()
      updatedColors['quat'] = baseColors[2]
      updatedColors['quin'] = baseColors[3]
      return updatedColors
    }

    return updatedColors
  }

  // Random Hex generated for color scheme genration.
  function generateRandomHexValue() {
    primaryColorHex = generateRandomColor() as string
    generateColors()
  }

  function generateDerivedColorShades() {
    let derivedColorShades: ColorSettings[] = []
    $storeThemeOptions.derivedColors.forEach((color) => {
      if (color.hex !== '') {
        const colorShades = buildColorShades(color)
        derivedColorShades = [...derivedColorShades, ...colorShades]
      }
    })

    return derivedColorShades
  }

  // Loop through all color options and derive shades.
  function generateSchemeColorShades() {
    let schemeColorShades: ColorSettings[] = []

    $storeThemeOptions.colors.forEach((color) => {
      if (color.hex !== '') {
        const colorShades = buildColorShades(color)
        schemeColorShades = [...schemeColorShades, ...colorShades]
      }
    })

    return schemeColorShades
  }

  function generateColors() {
    let updatedSchemeColors: Record<string, string | null> = {}

    updatedSchemeColors = generateColorScheme(updatedSchemeColors)

    // Create Colors used in every color scheme.
    let updatedDerivedColors: Record<string, string | null> = {}
    updatedDerivedColors = generateDerivedColors(updatedDerivedColors)

    const updatedColors = { ...updatedSchemeColors, ...updatedDerivedColors }
    updateColors(updatedColors)

    let schemeColorShades = generateSchemeColorShades()
    let derivedColorShades = generateDerivedColorShades()

    builtSchemeColorString = buildColorStrings(schemeColorShades, 'color')
    builtDerivedColorString = buildColorStrings(derivedColorShades, 'color')
  }

  function generateThemeOpts() {
    generateColors()
    generateBtnStrings()
    builtUIRoundString = buildUIRoundStrings(roundedSize, buttonRoundLevel, inputRoundLevel)
    builtElBtnString = buildElBtnStrings(btnPaddingBase)

    // setting initialized to true to trigger reactive vars.
    // we wait to trigger it to perform the init setup without triggering reactivity each time we assign a value.
    initialized = true
  }

  function initCachedColors() {
    // if ($storeThemeOptions.colors[0].hex) {
    //   primaryColorHex = $storeThemeOptions.colors[0].hex
    // }
    // if ($additionalColorsStore.warning) {
    //   updateColorsColl(colorsCollectionStore, 'warning', $additionalColorsStore.warning)
    // }
    // if ($additionalColorsStore.info) {
    //   updateColorsColl(colorsCollectionStore, 'info', $additionalColorsStore.info)
    // }
  }

  onMount(() => {
    generateThemeOpts()
  })
</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>{@html previewCSSVars}</svelte:head>

<div class="p-4 space-y-4">
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
      <div class="mx-auto space-y-4 text-center page-section">
        <ChipOptions on:colorSchemeChange={() => generateColors()} on:colorAdditionChange={() => generateColors()} />
        <!-- <button class="btn-md my-btn" on:click={() => generateThemeOpts()}>Generate Preview</button> -->
      </div>
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">Colors</h3>
    <div class="space-y-4">
      <div class="pb-2">
        {#each $storeThemeOptions.colors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
          <div
            class="grid grid-cols-1 md:grid-cols-[200px_1fr_120px] gap-2 md:gap-4 border-b-2 md:border-0 border-neutral-mlt md:pb-2 pb-2"
          >
            <ControlsLead hex={colorRow.hex} label={colorRow.label} />
            <Swatch color={colorRow.key} stops={colorRow?.stops?.split(',')} />
            <ControlsTail
              colorOn={colorRow.on}
              stops={colorRow.stops ?? ''}
              colorsIndex={i}
              on:textColorChange={handleTextColorChange}
            />
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
        <ButtonMaker
          {btnSizeScale}
          {btnPaddingBase}
          {btnPaddingWidthScale}
          {btnHoverScale}
          {btnActiveScale}
          {btnHoverBrightness}
          {btnActiveBrightness}
          {btnFontSmSize}
          {btnFontSize}
          {btnFontLgSize}
          on:btnOptsChange={handleBtnOptsChange}
        />
      </div>
      <div class="section-box"><p>Inputs here</p></div>
    </div>
  </section>

  <pre><code class="language-javascript">{themeOptsJsInCSS}</code></pre>
</div>

<style lang="post-css">
  :global(.options-input-wrapper) {
    @apply gap-2;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;

    /* Media query for md breakpoint */
    @media (min-width: 768px) {
      grid-template-columns: 200px 1fr;
    }
  }
</style>
