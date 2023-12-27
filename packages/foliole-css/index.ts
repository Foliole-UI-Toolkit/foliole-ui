// Package imports
import postcssJs from 'postcss-js'
import postcss from 'postcss'
// Types
import type { ColorTypeOfString, ColorTypeOfObject, Theme } from './types'

// Settings and Themes
import folioleTheme from './themes/foliole'
// Temp second theme as copy for example
import folioleThemeCopy from './themes/foliole-copy'
// Values used to map/generate values and for types.
import { folioleColorNames, stops } from './settings'
// Functions in separate file to keep this file clean.
import {
  buildThemeProps,
  builtTwThemeProps,
  generateColors,
  generateFolioleSpecificProps,
  getUsedCSSProps,
} from './scripts'

// Elements, Properties, Components
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

// Put all the themes in a array.
const themes = [folioleTheme, folioleThemeCopy]

// Hold these props in an object to avoid having to pass them around. Warning we mutate this object.
const folioleCSSProps = {
  spacing,
  font,
  uiRoundness,
}

let mergedEls: Record<string, Record<string, any>> = {
  ...btn,
  ...input,
}

// Object for organizational purposes.
let mergedCompsAndEls = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
  ...mergedEls,
}

// Object for organizational purposes. btn and input are handled in Tailwind Plugin.
const mergedTwComps = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

// Object for organizational purposes. btn and input are handled in Tailwind Plugin, but this object is used to check if props are used in btn and input.
const mergedTwCompsAndEls = {
  ...mergedTwComps,
  ...mergedEls,
}

export let twColors: ColorTypeOfString = {}
let backgrounds: ColorTypeOfObject = {}

// object will hold a ref to these objects.
const colorsToGenerate: any = {
  twColors,
  backgrounds,
}

;(async () => {
  try {
    generateColors(folioleColorNames, stops, colorsToGenerate)

    // Vanilla CSS
    mergedCompsAndEls = { ...mergedCompsAndEls, ...backgrounds }
    // temp ignore until TS error is solved.
    // Excessive stack depth comparing types 'Root_' and 'Document_ | Root_'.ts(2321)
    // import postcssJs
    // @ts-ignore
    const processedCSS = await postcss().process(mergedCompsAndEls, { parser: postcssJs })
    const mergedProcessedCSS = processedCSS.css

    await Bun.write('dist/foliole.css', mergedProcessedCSS)

    const cssPropsString = generateFolioleSpecificProps(folioleCSSProps)

    await Promise.all(
      themes.map(async (theme: Theme) => {
        const builtCssPropsString = await buildThemeProps(theme, cssPropsString)
        if (builtCssPropsString) {
          await Bun.write(`dist/themes/theme-${theme.name}-props.css`, builtCssPropsString)
        }
      }),
    )

    // Tailwind CSS
    // temp ignore until TS error is solved.
    // Excessive stack depth comparing types 'Root_' and 'Document_ | Root_'.ts(2321)
    // import postcssJs
    // @ts-ignore
    const processedTwCSS = await postcss().process(mergedTwComps, { parser: postcssJs })
    const mergedProcessedTwCSS = processedTwCSS.css

    await Bun.write('dist/foliole-for-tw.css', mergedProcessedTwCSS)

    let usedTwCompKeys = []
    const usedTwSpacingKeys = await getUsedCSSProps(spacing, 'spacing', mergedTwCompsAndEls)
    const usedTwFontKeys = await getUsedCSSProps(font, 'font', mergedTwCompsAndEls)

    usedTwCompKeys = [...usedTwSpacingKeys, ...usedTwFontKeys]

    let usedTwPropsString = usedTwCompKeys.join('\n')

    await Promise.all(
      themes.map(async (theme: Theme) => {
        const builtCssPropsString = await builtTwThemeProps(theme, usedTwPropsString)
        if (builtCssPropsString) {
          await Bun.write(`dist/themes/theme-${theme.name}-tw-props.css`, builtCssPropsString)
        }
      }),
    )
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()

export function twPlugin({ addComponents }: { addComponents: any }) {
  // Add Foliole Elements as components to Tailwind.
  addComponents(mergedEls)
}