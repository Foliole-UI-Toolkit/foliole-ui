import type { ColorSettings } from '../types'

import { intensityMap, intensityMapGray } from '../data/settings'

import { colorUtils } from './index'

// Import color utils by type
const { useGetConvertedColor, useGenerateColor } = colorUtils

const { getRgbString } = useGetConvertedColor()

const { generateA11yOnColor, generateDarkenedValue, generateLightenedValue } = useGenerateColor()

export function buildColorStrings(store: ColorSettings[], prefix: string) {
  let cssVars = ''
  let jsInCSS = 'export const color = { \n'

  store.forEach((element) => {
    if (element.stops) {
      // Define the CSS variable for the color with stops
      cssVars += `--${prefix}-${element.key}-${element.stops}: ${element.rgb};`
      jsInCSS += `  '${element.key}-${element.stops}': '${element.rgb}',`
    } else {
      // Define the CSS variable for the color without stops
      cssVars += `--${prefix}-${element.key}: ${element.rgb};`
      jsInCSS += `  '${element.key}': '${element.rgb}',`
    }
    cssVars += '\n'
    jsInCSS += '\n'
  })
  jsInCSS += '} \n'

  return { cssVars, jsInCSS }
}

//Build CSSVars and Options JS - Buttons
export function buildBtnStrings(
  btnPaddingBase: number,
  btnPaddingWidth: number,
  smBtnCalcs: Record<string, number>,
  lgBtnCalcs: Record<string, number>,
  chipBtnCalcs: Record<string, number>,
) {
  let cssVars = ''
  let jsInCSS = 'export const btn = { \n'
  // btn padding sm
  cssVars += `--btn-p-sm: ${smBtnCalcs.smBtnPaddingBase}rem ${smBtnCalcs.smBtnPaddingWidth}rem;\n`
  jsInCSS += `  'p-sm': '${smBtnCalcs.smBtnPaddingBase}rem ${smBtnCalcs.smBtnPaddingWidth}rem',\n`
  //btn padding base
  cssVars += `--btn-p-base: ${btnPaddingBase}rem ${btnPaddingWidth}rem;\n`
  jsInCSS += `  'p-base': '${btnPaddingBase}rem ${btnPaddingWidth}rem',\n`
  //chips
  cssVars += `--btn-chip-p: ${chipBtnCalcs.chipBtnPaddingBase}rem ${chipBtnCalcs.chipBtnPaddingWidth}rem;\n`
  jsInCSS += `  'chip-p': '${chipBtnCalcs.chipBtnPaddingBase}rem ${chipBtnCalcs.chipBtnPaddingWidth}rem',\n`
  //btn padding lg
  cssVars += `--btn-p-lg: ${lgBtnCalcs.lgBtnPaddingBase}rem ${lgBtnCalcs.lgBtnPaddingWidth}rem;\n`
  jsInCSS += `  'p-lg': '${lgBtnCalcs.lgBtnPaddingBase}rem ${lgBtnCalcs.lgBtnPaddingWidth}rem',\n`
  // cap end with }
  jsInCSS += `}\n`

  return { cssVars, jsInCSS }
}

// Build CSSVars and Options JS - UI Options
export function buildUIStrings(roundedSize: string, buttonRoundLevel: string, inputRoundLevel: string) {
  let cssVars = ''
  let jsInCSS = 'export const ui = { \n'
  if (roundedSize === 'none') {
    cssVars += `--ui-rounded: 0px;\n`
    jsInCSS += `'neue-rounded': '0px'\n}\n`
    cssVars += `--ui-button-roundness: 0px;\n`
    jsInCSS += `'button-roundness': '0px'\n}\n`
  } else {
    cssVars += `--ui-rounded: var(${roundedSize});\n`
    jsInCSS += `'rounded': 'var(${roundedSize})',\n`
    cssVars += `--ui-button-roundness: var(${buttonRoundLevel});\n`
    jsInCSS += `'button-roundness': 'var(${buttonRoundLevel})',\n`
    cssVars += `--ui-input-roundness: var(${inputRoundLevel});\n`
    jsInCSS += `'input-roundness': 'var(${inputRoundLevel})',\n`
    // cap end with }
    jsInCSS += `}\n`
  }

  return { cssVars, jsInCSS }
}

export // Build Shades.
function buildColorShades(color: any) {
  const hexValidation = new RegExp(/^#[0-9a-f]{6}$/i)

  if (!hexValidation.test(color.hex)) color.hex = '#CCCCCC'

  const hex500 = `#${color.hex}`.replace('##', '#')

  const response: ColorSettings[] = [
    {
      label: color.label,
      key: color.key,
      stops: 'base',
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
