import type { ColorSettings } from '../types'

import { get, type Readable } from 'svelte/store'

function buildLineFromPrefixAndValue(attrPrefix: string, attrBase: string, cssValue: string) {
  return `    --${attrPrefix}-${attrBase}: ${cssValue};\n`
}

// Helpers
export function buildElStrings(btnPaddingBase: string | number) {
  let cssVarsBuilt = ''

  const btnPaddingBaseNumber = Number(btnPaddingBase)
  const smPadding = btnPaddingBaseNumber / 2
  const basepadding = btnPaddingBaseNumber
  const doublePadding = btnPaddingBaseNumber * 2
  const triplePadding = btnPaddingBaseNumber * 3

  // El padding sm
  let cssVars = buildLineFromPrefixAndValue('el', 'sm', `${smPadding}rem`)
  cssVarsBuilt += cssVars

  // El padding
  cssVars = buildLineFromPrefixAndValue('el', 'p-base', `${basepadding}rem`)
  cssVarsBuilt += cssVars

  // El double padding
  cssVars = buildLineFromPrefixAndValue('el', 'p-double', `${doublePadding}rem`)
  cssVarsBuilt += cssVars

  // El triple padding
  cssVars = buildLineFromPrefixAndValue('el', 'p-triple', `${triplePadding}rem`)
  cssVarsBuilt += cssVars

  return cssVarsBuilt
}

export function buildBtnStrings(
  btnOpts: Record<string, number | string>,
  derivedBtnValues: Record<string, Readable<number | string>>,
) {
  let cssVarsBuilt = ''

  // btn padding sm
  let cssVars = buildLineFromPrefixAndValue(
    'btn',
    'p-sm',
    `${get(derivedBtnValues.btnSmPaddingBase)}rem ${get(derivedBtnValues.btnSmPaddingWidth)}rem`,
  )
  cssVarsBuilt += cssVars

  // btn padding base
  cssVars = buildLineFromPrefixAndValue(
    'btn',
    'p-base',
    `${btnOpts.paddingBase}rem ${get(derivedBtnValues.btnPaddingWidth)}rem`,
  )
  cssVarsBuilt += cssVars

  // chips
  cssVars = buildLineFromPrefixAndValue(
    'btn',
    'p-chip',
    `${get(derivedBtnValues.btnChipPaddingBase)}rem ${get(derivedBtnValues.btnChipPaddingWidth)}rem`,
  )
  cssVarsBuilt += cssVars

  // btn padding lg
  cssVars = buildLineFromPrefixAndValue(
    'btn',
    'p-lg',
    `${get(derivedBtnValues.btnLgPaddingBase)}rem ${get(derivedBtnValues.btnLgPaddingWidth)}rem`,
  )
  cssVarsBuilt += cssVars

  // btn interactive options
  // transform/scale
  cssVars = buildLineFromPrefixAndValue('btn', 'hover-scale', `${btnOpts.hoverScale}`)
  cssVarsBuilt += cssVars

  cssVars = buildLineFromPrefixAndValue('btn', 'active-scale', `${btnOpts.activeScale}`)
  cssVarsBuilt += cssVars

  // filter/brightness
  cssVars = buildLineFromPrefixAndValue('btn', 'hover-filter', `${btnOpts.hoverBrightnessScale}`)
  cssVarsBuilt += cssVars

  cssVars = buildLineFromPrefixAndValue('btn', 'active-filter', `${btnOpts.activeBrightnessScale}`)
  cssVarsBuilt += cssVars

  // btn font sizes
  cssVars = buildLineFromPrefixAndValue('btn', 'font-sm-size', `var(${btnOpts.fontSizeSm})`)
  cssVarsBuilt += cssVars

  cssVars = buildLineFromPrefixAndValue('btn', 'font-base-size', `var(${btnOpts.fontSize})`)
  cssVarsBuilt += cssVars

  cssVars = buildLineFromPrefixAndValue('btn', 'font-lg-size', `var(${btnOpts.fontSizeLg})`)
  cssVarsBuilt += cssVars

  return cssVarsBuilt
}

export function buildUIRoundStrings(size: string, btnRoundness: string, inputRoundness: string) {
  let cssVarsBuilt = ''

  if (size === 'none') {
    let cssVars = buildLineFromPrefixAndValue('ui', 'roundness', '0px')
    cssVarsBuilt += cssVars
    cssVars = buildLineFromPrefixAndValue('ui', 'btn-roundness', '0px')
    cssVarsBuilt += cssVars
    cssVars = buildLineFromPrefixAndValue('ui', 'input-roundness', '0px')
    cssVarsBuilt += cssVars
  } else {
    let cssVars = buildLineFromPrefixAndValue('ui', 'roundness', `var(${size})`)
    cssVarsBuilt += cssVars
    cssVars = buildLineFromPrefixAndValue('ui', 'btn-roundness', `var(${btnRoundness})`)
    cssVarsBuilt += cssVars
    cssVars = buildLineFromPrefixAndValue('ui', 'input-roundness', `var(${inputRoundness})`)
    cssVarsBuilt += cssVars
  }
  return cssVarsBuilt
}

// Loop over colors. Also creates TW vars. Use cssVarsBuilt and pass in tw to header/footer
export function buildColorStrings(store: ColorSettings[], prefix: string) {
  let cssVarsBuilt = ''

  store.forEach((element) => {
    if (element.stops) {
      // Define the CSS variable for the color with stops
      cssVarsBuilt += `    --${prefix}-${element.key}-${element.stops}: ${element.rgb};`
    } else {
      // Define the CSS variable for the color without stops
      cssVarsBuilt += `    --${prefix}-${element.key}: ${element.rgb};`
    }
    cssVarsBuilt += '\n'
  })

  return cssVarsBuilt
}
