import { type ColorSettings } from '../types'

import { useGetConvertedColor, useGenerateColor } from '../utilities'
import { intensityMap, intensityMapGray } from '../data/settings'

const { generateA11yOnColor, generateDarkenedValue, generateLightenedValue } = useGenerateColor()
const { getRgbString } = useGetConvertedColor()

// Build shades.
export function buildColorShades(color: Partial<ColorSettings>) {
  const hexValidation = new RegExp(/^#[0-9a-f]{6}$/i)

  const hex = color.hex && hexValidation.test(color.hex) ? color.hex : '#CCCCCC'
  const key = color.key || 'primary'
  const label = color.label || 'default'

  const hex500 = `#${hex}`.replace('##', '#')

  const response: ColorSettings[] = [
    {
      label,
      key,
      stops: '',
      hex: hex500,
      rgb: getRgbString(hex500),
      on: generateA11yOnColor(hex500),
    },
  ]

  ;['light', 'mlt', 'mdk', 'dark'].forEach((stop) => {
    let hexStop

    if (key.startsWith('neutral')) {
      hexStop =
        stop.includes('light') || stop.includes('mlt')
          ? (generateLightenedValue(hex, intensityMapGray[stop]) as string)
          : (generateDarkenedValue(hex, intensityMapGray[stop]) as string)
    } else {
      hexStop =
        stop.includes('light') || stop.includes('mlt')
          ? (generateLightenedValue(hex, intensityMap[stop]) as string)
          : (generateDarkenedValue(hex, intensityMap[stop]) as string)
    }
    response.push({
      label,
      key,
      stops: stop,
      hex: hexStop,
      rgb: getRgbString(hexStop as string),
      on: generateA11yOnColor(hexStop),
    })
  })

  return response
}
