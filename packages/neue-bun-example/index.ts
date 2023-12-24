// Package imports
import postcssJs from 'postcss-js'
import postcss from 'postcss'
// Types
import type { ColorTypeOfString, ColorTypeOfObject } from './types'

// Settings and Themes
import neueTheme from './themes/neue'
import { neueColorNames, stops } from './settings'
import { generateColors, findUsedCompKeys } from './scripts'

import { btn } from './styles/elements/btn.js'
import { input } from './styles/elements/input.js'
import { spacing } from './styles/properties/spacing.js'
import { font } from './styles/properties/font.js'
import { uiRoundness } from './styles/properties/roundness.js'
import { appShell } from './styles/components/app-shell.js'
import { appRail } from './styles/components/app-rail.js'
import { accordion } from './styles/components/accordion.js'
import { drawer } from './styles/components/drawer.js'
import { slideToggle } from './styles/components/slide-toggle.js'

const AT_TW_BASE = '@tailwind base;'
const AT_TW_COMPONENTS = '@tailwind components;'
const AT_TW_UTILITIES = '@tailwind utilities;'

// put all the themes in a array.
const themes = [neueTheme]

let mergedCSSInJsCompsAndElsForVanilla = {
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

const mergeCSSInJSCompsAndElementsForTw = {
  ...mergedCSSInJsCompsForTW,
  ...btn,
  ...input,
}

const usedSpacing = await findUsedCompKeys(spacing, 'spacing', mergeCSSInJSCompsAndElementsForTw)
const usedFont = await findUsedCompKeys(font, 'font', mergeCSSInJSCompsAndElementsForTw)

console.log(usedSpacing)
console.log(usedFont)

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

;(async () => {
  try {
    generateColors(neueColorNames, stops, colorTypes)

    mergedCSSInJsCompsAndElsForVanilla = { ...mergedCSSInJsCompsAndElsForVanilla, ...backgrounds, ...variants }

    // Vanilla CSS - post process into file for tw solution
    // @ts-ignore
    const resultVanilla = await postcss().process(mergedCSSInJsCompsAndElsForVanilla, { parser: postcssJs })
    const mergedVanillaCSS = resultVanilla.css
    await Bun.write('dist/neue.css', mergedVanillaCSS)

    // @ts-ignore
    const resultTw = await postcss().process(mergedCSSInJsCompsForTW, { parser: postcssJs })
    const mergedTwCSS = resultTw.css

    await Bun.write('dist/neue-for-tw.css', mergedTwCSS)
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()
