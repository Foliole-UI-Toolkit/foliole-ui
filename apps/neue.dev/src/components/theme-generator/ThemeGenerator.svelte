<script lang="ts">
  // Local components
  import ChipOptions from './partials/ChipOptions.svelte'
  import ColorPicker from './partials/ColorPicker.svelte'
  import ControlsLead from './partials/ControlsLead.svelte'
  import ControlsTrail from './partials/ControlsTrail.svelte'
  import Swatch from './partials/Swatch.svelte'

  import classNames from 'classnames'

  // Local Helpers
  import { colorUtils, centers } from './helpers'

  // Local data
  import { storeThemeOptions, storeColorResults } from './data'
  import { intensityMap } from './types'
  import type { ColorsCollection } from './types'

  import { singleSwatchColorClasses } from './data/settings'

  // Svelte related
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'

  // UI
  import { myBtn } from '../../neue-classes'

  // Import color utils by type
  const { useGetConvertedColor, useGetColorValue, useGenerateColor, useColorSchemes } = colorUtils

  // Get Converted Color Funcs
  const { getRgbValues, getRgbString, getHueFromHex } = useGetConvertedColor()

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

  let primaryColorHex: string = '#FF007F'
  let hashErrorMessage = ''
  let previewThemeString = ''

  // Make stores available to context they can be injected locally as needed in child components.
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

  // Random Hex as jumping off point to color scheme genration.
  function generateRandomHexValue() {
    primaryColorHex = generateRandomColor() as string
  }

  // Generate colors: create colors collection, fill in template options from colors collection and data output as string
  function generateColors() {
    updateColorsCollection()

    storeThemeOptions.update((currentOptions) => {
      return {
        ...currentOptions,
        colors: currentOptions.colors.map((color, i) => {
          if ($colorsCollectionStore[color.key]) {
            if ($colorsCollectionStore[color.key] !== null) {
              color.hex = $colorsCollectionStore[color.key] as string
            }
            return color
          } else {
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
            return color
          }
        }),
      }
    })

    $storeThemeOptions.colors.forEach((color) => {
      const colorShades = buildColorShades(color)

      storeColorResults.update((results) => {
        return [...results, ...colorShades]
      })
    })

    $storeThemeOptions.derivedColors.forEach((color) => {
      const colorShades = buildColorShades(color)

      storeColorResults.update((results) => {
        return [...results, ...colorShades]
      })
    })

    previewThemeString = buildCSSVars('color', 'rgb')
    previewThemeString = `<style>:root { \n ${previewThemeString} \n }</style>`
  }

  function buildCSSVars(prefix: string, type: string) {
    let cssVars = ''

    const types = {
      rgb: (rgb: string) => {
        return `rgba(${rgb}, 1)`
      },
    }

    $storeColorResults.forEach((element) => {
      if (element.level) {
        cssVars += `--${prefix}-${element.key}-${element.level}: ${types[type](element.rgb)};`
      } else {
        cssVars += `--${prefix}-${element.key}: ${types[type](element.rgb)};`
      }
      cssVars += '\n'
    })
    return cssVars
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
      colorsCollection['page'] = generateLightenedValue(grays[0], intensityMap['light'])
      colorsCollection['surface'] = generateLightenedValue(grays[0], 2.125)

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
          break
        case 'split-complimentary':
          baseColors = generateSplitComplimentaryColors(primaryColorHex)
          createPrimaries()
          break
        case 'analogous-triad':
          baseColors = generateAnalogousColors(primaryColorHex, 20, 'analogous-triad')
          createPrimaries()
          break
        case 'analogous-quad':
          baseColors = generateAnalogousColors(primaryColorHex, 20, 'analogous-quad')
          createPrimaries()
          colorsCollection['quaternary'] = baseColors[2]
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
      const hex = level.includes('light')
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
    generateColors()
  })
</script>

<svelte:window on:keydown={handleKeyDown} />
<svelte:head>{@html previewThemeString}</svelte:head>

<div class="space-y-2 page-one-col">
  <section class="flex flex-col items-center gap-2 p-4 bg-gray-200 lg:gap-4">
    <h2 class="text-center page-header">Color Generator</h2>
    <p class="w-2/3 text-center leading-[1.25rem]">
      <span class="hidden md:inline">Press Ctrl (or Windows Key) + space to generate a random color. </span>Enter a hex
      code or click to pick a hex code.
    </p>
    <button on:click={generateRandomHexValue} class={`p-2 ${myBtn}`}>Random Color</button>
    <ColorPicker colorHex={primaryColorHex} on:colorChange={handleColorPickerChange} />
    <p class="text-xl text-error">{hashErrorMessage}</p>
    <ChipOptions />
    <button class={`p-2 ${myBtn}`} on:click={generateColors}>Generate Preview</button>

    <!-- <button class="btn variant-ghost-secondary" on:click={removeGeneratedCSS}>Remove</button> -->
  </section>
  <section>
    <div class="grid grid-cols-1 gap-2 sm:gap-4">
      {#each $storeThemeOptions.colors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
        <div
          class="grid grid-cols-1 lg:grid-cols-[160px_1fr_250px] gap-2 lg:gap-4 border-b-4 lg:border-b-0 border-surface-100 pb-6 lg:pb-0"
        >
          <ControlsLead label={colorRow.label} hex={colorRow.hex} />
          <Swatch color={colorRow.key} stops={colorRow.stops.split(',')} />
          <ControlsTrail colorOn={colorRow.on} stops={colorRow.stops} colorsIndex={i} />
        </div>
      {/each}

      {#each $storeThemeOptions.derivedColors.filter((colorRow) => colorRow.hex !== '') as colorRow, i}
        <div
          class="grid grid-cols-1 lg:grid-cols-[160px_1fr_250px] gap-2 lg:gap-4 border-b-4 lg:border-b-0 border-surface-100 pb-6 lg:pb-0"
        >
          <div class="flex order-3 lg:order-2">
            <div class="grid grid-rows-[1fr_40px] text-center w-full">
              <div class="text-sm text-surface-mdk dark:text-surface-mlt" />
              <div
                class="flex items-center justify-center h-full {singleSwatchColorClasses[colorRow.key].base
                  ? singleSwatchColorClasses[colorRow.key].base
                  : ''}"
              />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <pre><code class="language-javascript"></code></pre>
</div>

<style lang="postcss">
  /* only use when nested with a parent with an outline indicator as this removes visual que for accessibility otherwise */
  :global(input.nested-input) {
    box-shadow: none !important;
    border: none !important;
  }
</style>
