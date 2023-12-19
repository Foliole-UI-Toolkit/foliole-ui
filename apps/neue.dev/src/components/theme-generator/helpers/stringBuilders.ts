import type { ColorSettings } from '../types'

import { writable, get } from 'svelte/store'

export type BuiltResults = {
  cssVarsBuilt: string
  jsInCSSBuilt: string
  twVarsBuilt?: string
}

// Utilities for internal file use.
function headerForJsInCSS(base: string) {
  // map for custom headers
  const typeMap: Record<string, string> = {
    tw: `@layer base { \n \t:root {
      `,
  }
  const headerBase = `export const ${base} = { \n`
  return typeMap[base] !== undefined ? typeMap[base] : headerBase
}

function footerForJsInCSS(base: string) {
  // map for custom footers
  const typeMap: Record<string, string> = {
    tw: `\t}\n}\n`,
  }
  const footerBase = `}\n`
  return typeMap[base] !== undefined ? typeMap[base] : footerBase
}

function buildLineFromPrefixAndValue(attrPrefix: string, attrBase: string, cssValue: string) {
  let cssVars = `--${attrPrefix}-${attrBase}: ${cssValue};\n`
  let jsInCSS = `  '${attrBase}': '${cssValue}',\n`

  return { cssVars, jsInCSS }
}

// Helpers
export function buildElStrings(btnPaddingBase: number) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = ''

  const smPadding = btnPaddingBase / 2
  const basepadding = btnPaddingBase
  const doublePadding = btnPaddingBase * 2
  const triplePadding = btnPaddingBase * 3

  // El padding sm
  let { cssVars, jsInCSS } = buildLineFromPrefixAndValue('el', 'sm', `${smPadding}rem`)
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

  return { cssVarsBuilt, jsInCSSBuilt }
}

export function buildBtnStrings(btnOpts: Record<string, number | string>, derivedBtnValues: any) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = ''

  // btn padding sm
  let { cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-sm',
    `${get(derivedBtnValues.btnSmPaddingBase)}rem ${get(derivedBtnValues.btnSmPaddingWidth)}rem`,
  )
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn padding base
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-base',
    `${btnOpts.paddingBase}rem ${get(derivedBtnValues.btnPaddingWidth)}rem`,
  ))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // chips
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-chip',
    `${get(derivedBtnValues.btnChipPaddingBase)}rem ${get(derivedBtnValues.btnChipPaddingWidth)}rem`,
  ))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn padding lg
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue(
    'btn',
    'p-lg',
    `${get(derivedBtnValues.btnLgPaddingBase)}rem ${get(derivedBtnValues.btnLgPaddingWidth)}rem`,
  ))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn interactive options
  // transform/scale
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'hover-scale', `${btnOpts.hoverScale}`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'active-scale', `${btnOpts.activeScale}`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // filter/brightness
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'hover-filter', `${btnOpts.hoverBrightnessScale}%`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'active-filter', `${btnOpts.activeBrightnessScale}%`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  // btn font sizes
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'font-sm-size', `var(${btnOpts.fontSizeSm})`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'font-base-size', `var(${btnOpts.fontSize})`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS
  ;({ cssVars, jsInCSS } = buildLineFromPrefixAndValue('btn', 'font-lg-size', `var(${btnOpts.fontSizeLg})`))
  cssVarsBuilt += cssVars
  jsInCSSBuilt += jsInCSS

  return { cssVarsBuilt, jsInCSSBuilt }
}

export function capJsInCSSString(str: string, type: string) {
  let built = headerForJsInCSS(type)

  built += str

  built += footerForJsInCSS(type)

  return built
}

export function buildUIRoundStrings(roundedSize: string, buttonRoundLevel: string, inputRoundLevel: string) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = ''

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
  }
  return { cssVarsBuilt, jsInCSSBuilt }
}

// Loop over colors. Also creates TW vars. Use cssVarsBuilt and pass in tw to header/footer
export function buildColorStrings(store: ColorSettings[], prefix: string) {
  let cssVarsBuilt = ''
  let jsInCSSBuilt = ''

  store.forEach((element) => {
    if (element.stops) {
      // Define the CSS variable for the color with stops
      cssVarsBuilt += `     --${prefix}-${element.key}-${element.stops}: ${element.rgb};`
      jsInCSSBuilt += `    '${element.key}-${element.stops}': '${element.rgb}',`
    } else {
      // Define the CSS variable for the color without stops
      cssVarsBuilt += `     --${prefix}-${element.key}: ${element.rgb};`
      jsInCSSBuilt += `    ${element.key}': '${element.rgb}',`
    }
    cssVarsBuilt += '\n'
    jsInCSSBuilt += '\n'
  })

  return { cssVarsBuilt, jsInCSSBuilt }
}
