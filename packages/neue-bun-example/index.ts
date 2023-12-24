// Package imports
import postcssJs from 'postcss-js'
import postcss from 'postcss'
// Types
import type { ColorTypeOfString, ColorTypeOfObject, Theme } from './types'

// Settings and Themes
import neueTheme from './themes/neue'
// Temp second theme as copy for example
import neueThemeCopy from './themes/neue-copy'

import { neueColorNames, stops } from './settings'
import { findUsedCompKeys, generateColors, generateNeueSpecificProps, buildThemeProps } from './scripts'

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
const themes = [neueTheme, neueThemeCopy]

const neueCSSProps = {
  spacing,
  font,
  uiRoundness,
}

let mergedCompsAndEls = {
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
const mergedTwComps = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...drawer,
  ...slideToggle,
}

const mergedTwCompsAndEls = {
  ...mergedTwComps,
  ...btn,
  ...input,
}

let twColors: ColorTypeOfString = {}
let backgrounds: ColorTypeOfObject = {}
let variants: ColorTypeOfObject = {}

// object will hold a ref to these objects.
const colorsToGenerate: any = {
  twColors,
  backgrounds,
  variants,
}

;(async () => {
  try {
    generateColors(neueColorNames, stops, colorsToGenerate)

    // Vanilla CSS
    mergedCompsAndEls = { ...mergedCompsAndEls, ...backgrounds, ...variants }
    // @ts-ignore
    const processedCSS = await postcss().process(mergedCompsAndEls, { parser: postcssJs })
    const mergedProcessedCSS = processedCSS.css

    await Bun.write('dist/neue.css', mergedProcessedCSS)

    const cssPropsString = generateNeueSpecificProps(neueCSSProps)

    await Promise.all(
      themes.map(async (theme: Theme) => {
        const builtCssPropsString = await buildThemeProps(theme, cssPropsString)
        if (builtCssPropsString) {
          await Bun.write(`dist/themes/theme-${theme.name}-props.css`, builtCssPropsString)
        }
      }),
    )

    // Tailwind CSS
    // @ts-ignore
    const processedTwCSS = await postcss().process(mergedTwComps, { parser: postcssJs })
    const mergedProcessedTwCSS = processedTwCSS.css

    await Bun.write('dist/neue-for-tw.css', mergedProcessedTwCSS)

    let usedTwCompKeys = []
    const usedTwSpacingKeys = await findUsedCompKeys(spacing, 'spacing', mergedTwCompsAndEls)
    const usedTwFontKeys = await findUsedCompKeys(font, 'font', mergedTwCompsAndEls)

    usedTwCompKeys = [...usedTwSpacingKeys, ...usedTwFontKeys]

    let usedTwPropsString = usedTwCompKeys.join('\n')

    await Promise.all(
      themes.map(async (theme: Theme) => {
        const builtCssPropsString = await buildThemeProps(theme, usedTwPropsString)
        if (builtCssPropsString) {
          await Bun.write(`dist/themes/theme-${theme.name}-tw-props.css`, builtCssPropsString)
        }
      }),
    )
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()
