import type { ColorSettings } from '../types'

import { intensityMap, intensityMapGray } from '../data/settings'

import { colorUtils } from './index'

// Import color utils by type
const { useGetConvertedColor, useGenerateColor } = colorUtils

const { getRgbString } = useGetConvertedColor()

const { generateA11yOnColor, generateDarkenedValue, generateLightenedValue } = useGenerateColor()

// String builder helpers for internal file use.
function buildJsInCSSHead(base: string) {
  return `export const ${base} = { \n`
}

function buildJsInCSSTail() {
  return `}\n`
}

function buildLineFromPrefixAndValue(attrPrefix: string, attrBase: string, cssValue: string) {
  let cssVars = `--${attrPrefix}-${attrBase}: ${cssValue};\n`
  let jsInCSS = `  '${attrBase}': '${cssValue}',\n`

  return { cssVars, jsInCSS }
}

// Loop over colors.
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

// Build Shades.
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

export function buildElStrings(btnPaddingBase: number) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = buildJsInCSSHead('el')

  const smPadding = btnPaddingBase / 2
  const basepadding = btnPaddingBase
  const doublePadding = btnPaddingBase * 2
  const triplePadding = btnPaddingBase * 3

  // El padding sm
  let { cssVars, jsInCSS } = buildLineFromPrefixAndValue('el', 'p-sm', `${smPadding}rem`)
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // El padding
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('el', 'p-base', `${basepadding}rem`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // El double padding
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('el', 'p-double', `${doublePadding}rem`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // El triple padding
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('el', 'p-triple', `${triplePadding}rem`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // Complete the JavaScript string
  jsInCSSBuilt += buildJsInCSSTail('el')

  return { cssVarsBuilt, jsInCSSBuilt }
}

// Build CSSVars and Options JS - Buttons
export function buildBtnStrings(
  btnOpts: Record<string, number | string>,
  smBtnCalcs: Record<string, number>,
  lgBtnCalcs: Record<string, number>,
  chipBtnCalcs: Record<string, number>,
) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = buildJsInCSSHead('btn')

  // btn padding sm
  let { cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-sm',
    `${smBtnCalcs.smBtnPaddingBase}rem ${smBtnCalcs.smBtnPaddingWidth}rem`,
  )
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn padding base
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-base',
    `${btnOpts.btnPaddingBase}rem ${btnOpts.btnPaddingWidth}rem`,
  ))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // chips
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'chip-p',
    `${chipBtnCalcs.chipBtnPaddingBase}rem ${chipBtnCalcs.chipBtnPaddingWidth}rem`,
  ))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn padding lg
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-lg',
    `${lgBtnCalcs.lgBtnPaddingBase}rem ${lgBtnCalcs.lgBtnPaddingWidth}rem`,
  ))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn interactive options
  // transform/scale
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'hover-scale', `${btnOpts.btnHoverScale}`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'active-scale', `${btnOpts.btnActiveScale}`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // filter/brightness
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'hover-filter', `${btnOpts.btnHoverBrightness}%`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'active-filter', `${btnOpts.btnActiveBrightness}%`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn font sizes
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'font-sm-size', `var(${btnOpts.btnFontSmSize})`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'font-size', `var(${btnOpts.btnFontSize})`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'font-lg-size', `var(${btnOpts.btnFontLgSize})`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // Complete the JavaScript string
  jsInCSSBuilt += buildJsInCSSTail('btn')

  return { cssVarsBuilt, jsInCSSBuilt }
}

// Build CSSVars and Options JS - UI Options
export function buildUIStrings(roundedSize: string, buttonRoundLevel: string, inputRoundLevel: string) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = buildJsInCSSHead('ui')

  if (roundedSize === 'none') {
    let { cssVars, jsInCSS } = buildLineFromPrefixAndValue('ui', 'rounded', '0px')
    cssVarsBuilt += cssVars
    jsInCSSBuilt += jsInCSS
    //
    ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('ui', 'button-roundness', '0px'))
    cssVarsBuilt += cssVars
    jsInCSSBuilt += jsInCSS
  } else {
    let { cssVars, jsInCSS } = buildLineFromPrefixAndValue('ui', 'rounded', `var(${roundedSize})`)
    cssVarsBuilt += cssVars
    jsInCSSBuilt += jsInCSS
    //
    ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('ui', 'button-roundness', `var(${buttonRoundLevel})`))
    cssVarsBuilt += cssVars
    jsInCSSBuilt += jsInCSS
    //
    ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('ui', 'input-roundness', `var(${inputRoundLevel})`))
    cssVarsBuilt += cssVars
    jsInCSSBuilt += jsInCSS
    //
    jsInCSSBuilt += buildJsInCSSTail('ui')
  }
  return { cssVarsBuilt, jsInCSSBuilt }
}
