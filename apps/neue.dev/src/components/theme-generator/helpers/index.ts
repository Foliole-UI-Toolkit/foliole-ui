import type { Writable } from 'svelte/store'

// Utils, helpers and settings
import { createSaturation, useGenerateColor, useGetConvertedColor } from '../utilities'
import { intensityMap, intensityMapGray } from '../data/settings'

// Types
import type { ColorsCollection, ColorSettings } from '../types'

const { generateA11yOnColor, generateColorFromHSL, generateDarkenedValue, generateLightenedValue } = useGenerateColor()

const { getRgbString } = useGetConvertedColor()

// Import color utils by type

export function updateColorsColl(store: Writable<ColorsCollection>, color: string, hex: string) {
  const saturation = createSaturation(hex)

  if (color === 'warning') {
    store.update((colorsCollection) => {
      colorsCollection['warning'] = generateColorFromHSL(centers.yellow, saturation, 0.5)
      return colorsCollection
    })
    return
  }

  if (color === 'info') {
    store.update((colorsCollection) => {
      colorsCollection['info'] = generateColorFromHSL(centers['blue-info'], saturation, 0.6)
      return colorsCollection
    })
    return
  }
}

// Build shades.
export function buildColorShades(color: any) {
  const hexValidation = new RegExp(/^#[0-9a-f]{6}$/i)

  if (!hexValidation.test(color.hex)) color.hex = '#CCCCCC'

  const hex500 = `#${color.hex}`.replace('##', '#')

  const response: ColorSettings[] = [
    {
      label: color.label,
      key: color.key,
      stops: '',
      hex: hex500,
      rgb: getRgbString(hex500),
      on: generateA11yOnColor(hex500),
    },
  ]

  ;['light', 'mlt', 'mdk', 'dark'].forEach((stop) => {
    let hex

    if (color.key.startsWith('neutral')) {
      hex =
        stop.includes('light') || stop.includes('mlt')
          ? (generateLightenedValue(color.hex, intensityMapGray[stop]) as string)
          : (generateDarkenedValue(color.hex, intensityMapGray[stop]) as string)
    } else {
      hex =
        stop.includes('light') || stop.includes('mlt')
          ? (generateLightenedValue(color.hex, intensityMap[stop]) as string)
          : (generateDarkenedValue(color.hex, intensityMap[stop]) as string)
    }
    response.push({
      label: color.label,
      key: color.key,
      stops: stop,
      hex,
      rgb: getRgbString(hex as string),
      on: generateA11yOnColor(hex),
    })
  })

  return response
}
