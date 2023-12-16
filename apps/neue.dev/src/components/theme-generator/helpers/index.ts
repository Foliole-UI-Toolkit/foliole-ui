import { type ColorSettings } from '../types'

import { useGetConvertedColor, useGenerateColor } from '../utilities'
import { intensityMap, intensityMapGray } from '../data/settings'

const { generateA11yOnColor, generateDarkenedValue, generateLightenedValue } = useGenerateColor()
const { getRgbString } = useGetConvertedColor()

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
