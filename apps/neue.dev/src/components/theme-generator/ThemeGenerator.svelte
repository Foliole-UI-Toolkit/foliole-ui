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

  // Helpers
  import {
    buildBtnStrings,
    buildColorStrings,
    buildElStrings,
    capJsInCSSString,
    buildUIRoundStrings,
    type BuiltResults,
  } from './helpers/stringBuilders'

  import { buildColorShades } from './helpers'

  // Data
  import { initializeThemeOptionsStore } from './data/stores'
  import { surfaceMap } from './data/settings'

  // Types
  import type { NeueAdditionalColorSchemesMapKeys, ColorSettings } from './types'

  // Svelte related
  import { onMount, setContext } from 'svelte'
  import { writable, get } from 'svelte/store'
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

  const colorSchemeStore = writable('analogous-triad')

  const { themeOptionsStore, derivedThemeOptions } = initializeThemeOptionsStore()

  const additionalColorsStore: Writable<NeueAdditionalColorSchemesMapKeys> = localStorageStore('additionalColors', {})

  // Color options
  let selectedSurfaceLevel: string = 'low'
  let grayHue = 0.02

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
        capJsInCSSString(builtDerivedColorString.jsInCSSBuilt, 'tw') +
        capJsInCSSString(builtBtnString.jsInCSSBuilt, 'btn') +
        capJsInCSSString(builtUIRoundString.jsInCSSBuilt, 'ui') +
        builtElBtnString.jsInCSSBuilt +
        capJsInCSSString(builtElBtnString.cssVarsBuilt, 'el')
    }
  }

  // Make stores available to context so they can be injected locally as needed in child components.
  setContext('additionalColorsStore', additionalColorsStore)
  setContext('colorSchemeStore', colorSchemeStore)

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
      $themeOptionsStore.primaryHex = event?.detail
    }
    generateColors()
  }

  // Handle controlsTailChange Opts changed.
  function handleTextColorChange(event: CustomEvent) {
    // btnPaddingBase = event.detail.color
  }

  //
  // Commented out temporarily while working on feature.
  //
  // Handle surface relationship changed.
  // We will likely need to update the shades for these as well.
  // function handleSurfaceRelationshipChange(event: CustomEvent) {
  //   selectedSurfaceLevel = event.detail.selectedSurfaceLevel

  //   let updatedColors: any = {}

  //   updatedColors = generateBaseDerivedColorScheme(updatedColors)

  //   themeOptionsStore.updateDerivedColors(updateColors)

  //   generateDerivedColorShades()
  // }

  // Handle Gray Hue changed.
  // We will likely need to update the shades for these as well.
  // function handleGrayHueChange(event: CustomEvent) {
  //   grayHue = parseFloat(event.detail.grayHue)

  //   let updatedColors: any = {}

  //   updatedColors = generateBaseDerivedColorScheme(updatedColors)

  //   themeOptionsStore.updateDerivedColors(updateColors)
  // }

  function generateRoundedStrings() {
    builtUIRoundString = buildUIRoundStrings(
      $themeOptionsStore.roundedOpts.size,
      $themeOptionsStore.roundedOpts.btnRoundness,
      $themeOptionsStore.roundedOpts.inputRoundness,
    )
  }
  function generateBtnStrings() {
    builtBtnString = buildBtnStrings($themeOptionsStore.btnOpts, derivedThemeOptions)
  }

  // Generate derived colors only.
  function generateBaseDerivedColorScheme(updatedColors: any) {
    // Surface colors.
    const hue = getHueFromHex($themeOptionsStore.primaryHex)
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
  function generateBaseColorScheme(updatedColors: Record<string, string | null>) {
    // colorsCollectionStore.update((colorsCollection) => {
    let baseColors: (string | null)[] = []
    // Array because we will have multi gray options later.
    const baseSaturation = getSaturation($themeOptionsStore.primaryHex)
    const saturation = baseSaturation > 0.79 ? baseSaturation : baseSaturation + 0.2

    updatedColors['error'] = generateColorFromHSL(centers.red, saturation, 0.5)
    updatedColors['success'] = generateColorFromHSL(centers.green, saturation, 0.5)

    const createPrimaries = () => {
      updatedColors['primary'] = $themeOptionsStore.primaryHex
      updatedColors['secondary'] = baseColors[0]
      updatedColors['tertiary'] = baseColors[1]
    }

    // Individual differences in color schemes.
    if ($colorSchemeStore === 'triad') {
      baseColors = generateTriadColors($themeOptionsStore.primaryHex)
      createPrimaries()
      updatedColors['quat'] = ''
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'split-complimentary') {
      baseColors = generateSplitComplimentaryColors($themeOptionsStore.primaryHex)
      createPrimaries()
      updatedColors['quat'] = ''
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'analogous-triad') {
      baseColors = generateAnalogousColors($themeOptionsStore.primaryHex, 40, 'analogous-triad')
      createPrimaries()
      updatedColors['quat'] = ''
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'analogous-quad') {
      baseColors = generateAnalogousColors($themeOptionsStore.primaryHex, 40, 'analogous-quad')
      createPrimaries()
      updatedColors['quat'] = baseColors[2]
      updatedColors['quin'] = ''
      return updatedColors
    }

    if ($colorSchemeStore === 'analogous-quin') {
      baseColors = generateAnalogousColors($themeOptionsStore.primaryHex, 20, 'analogous-quin')
      createPrimaries()
      updatedColors['quat'] = baseColors[2]
      updatedColors['quin'] = baseColors[3]
      return updatedColors
    }

    return updatedColors
  }

  // Random Hex generated for color scheme genration.
  function generateRandomHexValue() {
    $themeOptionsStore.primaryHex = generateRandomColor() as string
    generateColors()
  }

  function generateDerivedColorShades() {
    let derivedColorShades: ColorSettings[] = []
    $themeOptionsStore.derivedColors.forEach((color) => {
      if (color.hex !== '') {
        const colorShades = buildColorShades(color)
        derivedColorShades = [...derivedColorShades, ...colorShades]
      }
    })

    return derivedColorShades
  }

  // Loop through all color options and derive shades.
  function generateColorShades() {
    let schemeColorShades: ColorSettings[] = []

    $themeOptionsStore.colors.forEach((color) => {
      if (color.hex !== '') {
        const colorShades = buildColorShades(color)
        schemeColorShades = [...schemeColorShades, ...colorShades]
      }
    })

    return schemeColorShades
  }

  function generateColors() {
    // Create base color scheme values.
    let updatedColors: Record<string, string | null> = {}
    updatedColors = generateBaseColorScheme(updatedColors)
    themeOptionsStore.updateColors('colors', updatedColors)

    // Create base colors derived from color scheme values.
    let updatedDerivedColors: Record<string, string | null> = {}
    updatedDerivedColors = generateBaseDerivedColorScheme(updatedDerivedColors)
    themeOptionsStore.updateColors('derivedColors', updatedDerivedColors)

    // Create shades based on base values.
    let schemeColorShades = generateColorShades()
    let derivedColorShades = generateDerivedColorShades()

    // Build the colors into strings for preview and user options.
    builtSchemeColorString = buildColorStrings(schemeColorShades, 'color')
    builtDerivedColorString = buildColorStrings(derivedColorShades, 'color')
  }

  function generateThemeOpts() {
    generateColors()
    generateBtnStrings()
    generateRoundedStrings()
    builtElBtnString = buildElStrings($themeOptionsStore.btnOpts.paddingBase)

    // setting initialized to true to trigger reactive vars.
    // we wait to trigger it to perform the init setup without triggering reactivity each time we assign a value.
    initialized = true
  }

  function initCachedColors() {
    // if ($themeOptionsStore.colors[0].hex) {
    //   $themeOptionsStore.primaryHex = $themeOptionsStore.colors[0].hex
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
      <ColorPicker colorHex={$themeOptionsStore.primaryHex} on:colorChange={handleColorPickerChange} />
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
        {#each $themeOptionsStore.colors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
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
      <!-- <SurfaceRelationships
        {selectedSurfaceLevel}
        {grayHue}
        on:surfaceRelationshipsChange={handleSurfaceRelationshipChange}
        on:grayHueChange={handleGrayHueChange}
      /> -->
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">UI Options</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="section-box">
        <RoundedMaker on:roundedInputChange={() => generateRoundedStrings()} />
      </div>
      <div class="section-box"><p>Shadows here</p></div>
    </div>
  </section>
  <section class="page-section">
    <h3 class="text-3xl page-heading">Elements</h3>
    <div class="grid grid-cols-2 gap-4">
      <div class="section-box">
        <ButtonMaker on:btnInputChange={() => generateBtnStrings()} />
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
