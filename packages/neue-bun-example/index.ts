// Package imports
import postcssJs from 'postcss-js'
import postcss from 'postcss'
import stringify from 'javascript-stringify'
import path from 'path'
// Types
import type { ColorTypeOfString, ColorTypeOfObject } from './types'

// Settings and Themes
import neueTheme from './themes/neue'
import { neueColorNames, stops } from './settings'
import { generateColors, toCSSProperties } from './scripts'

import { btn } from './styles/elements/btn.js'
import { input } from './styles/elements/input.js'
import { spacing } from './styles/properties/spacing.js'
import { font } from './styles/properties/font.js'
import { uiRoundness } from './styles/properties/roundness.js'
import { appShell } from './styles/components/app-shell.js'
import { appRail } from './styles/components/app-rail.js'
import { accordion } from './styles/components/accordion.js'
import { slideToggle } from './styles/components/slide-toggle.js'
import { drawer } from './styles/components/drawer.js'

const AT_TW_BASE = '@tailwind base;'
const AT_TW_COMPONENTS = '@tailwind components;'
const AT_TW_UTILITIES = '@tailwind utilities;'

const baseDir = path.join(import.meta.dir, '..')
// put all the themes in a array.
const themes = [neueTheme]

const mergedCSSInJsCompsAndElsForVanilla = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
  ...btn,
  ...input,
}

// Taking components (elements and tokens handled by tailwind settings) and merging into an object.
// Components use elements and tokens.
const mergedCSSInJsCompsForTW = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

async function findUsedCompKeys(token: Record<string, string>, tokenName: string) {
  const foundKeys = new Set()

  for (const cssClass of Object.values(mergedCSSInJsCompsForTW)) {
    const cssString = stringify.stringify(cssClass, null, 2)

    if (cssString) {
      for (const key of Object.keys(token)) {
        const propKey = `--${tokenName}-${key.replace('.', 'pt')}`
        const propKeyStr = `var(${propKey})`
        if (cssString.includes(propKeyStr)) {
          foundKeys.add(propKey)
        }
      }
    }
  }

  const sortedKeys = [...foundKeys].sort((a: string, b: string) => {
    const numA = parseInt(a.match(/\d+/)[0])
    const numB = parseInt(b.match(/\d+/)[0])
    return numA - numB
  })

  console.log(sortedKeys)

  return foundKeys
}

const usedSpacing = await findUsedCompKeys(spacing, 'spacing')

console.log(usedSpacing)

let twColors: ColorTypeOfString = {}
let backgrounds: ColorTypeOfObject = {}
let variants: ColorTypeOfObject = {}
let neueCSSProps = ''

// object will hold a ref to these objects.
const colorTypes: any = {
  twColors,
  backgrounds,
  variants,
}

// function generateNeueProps() {
//   const allSpacingCSS = toCSSProperties('spacing', spacing)
//   const allRoundnessCSS = toCSSProperties('ui-roundness', uiRoundness['ui-roundness'])
//   const allFontCSS = toCSSProperties('font', font)

//   const combinedCSS = allSpacingCSS + '\n' + allRoundnessCSS + '\n' + allFontCSS

//   return combinedCSS
// }

;(async () => {
  try {
    generateColors(neueColorNames, stops, colorTypes)
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()
