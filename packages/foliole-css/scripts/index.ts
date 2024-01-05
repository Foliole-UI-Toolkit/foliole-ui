// Package imports
import postcssJs from 'postcss-js'
import postcss from 'postcss'
import prettier from 'prettier'
// Types
import type { ColorTypeOfString, ColorTypeOfObject, Theme } from '../types'

// Settings and Themes
import folioleTheme from '../themes/foliole'
// Temp second theme as copy for example
import folioleThemeCopy from '../themes/foliole-copy'
// Values used to map/generate values and for types.
import { folioleColorNames, stops } from '../settings'
// Functions in separate file to keep this file clean.
import {
  buildThemeProps,
  builtTwThemeProps,
  generateColors,
  getUsedCSSProps,
  objectsToCSSProperties,
} from '../scripts/helpers.js'

// Elements, Properties, Components
import { btn } from '../styles/elements/btn.js'
import { input } from '../styles/elements/input.js'
import { spacing } from '../styles/properties/spacing.js'
import { font } from '../styles/properties/font.js'
import { uiRoundness } from '../styles/properties/roundness.js'
import { ui } from '../styles/properties/tokens/ui.js'
import { appShell } from '../styles/components/app-shell.js'
import { appRail } from '../styles/components/app-rail.js'
import { accordion } from '../styles/components/accordion.js'
import { drawer } from '../styles/components/drawer.js'
import { slideToggle } from '../styles/components/slide-toggle.js'

// Put all the themes in a array.
const themes = [folioleTheme, folioleThemeCopy]

// Hold these props in an object to avoid having to pass them around. Warning we mutate this object.
const folioleCSSProps = {
  spacing,
  font,
  uiRoundness,
  ui,
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
    // Assigns variables by reference, backgrounds and twColors.
    generateColors(folioleColorNames, stops, colorsToGenerate)

    if (Bun.argv[2] === '--tw') {
      // Build for TW.

      // temp ignore until TS error is solved.
      // Excessive stack depth comparing types 'Root_' and 'Document_ | Root_'.ts(2321)
      // import postcssJs
      // @ts-ignore
      const processedTwCSS = await postcss().process(mergedTwComps, { parser: postcssJs })
      const mergedProcessedTwCSS = processedTwCSS.css

      let usedTwCompProps = []
      const usedTwSpacingKeys = await getUsedCSSProps(spacing, 'spacing', mergedTwCompsAndEls)
      const usedTwFontKeys = await getUsedCSSProps(font, 'font', mergedTwCompsAndEls)
      const usedTwRoundnessKeys = await getUsedCSSProps(uiRoundness, 'ui-roundness', mergedTwCompsAndEls)
      // const usedTwUiKeys = await getUsedCSSProps(ui, 'ui', mergedTwCompsAndEls, uiRoundness)

      // we need to use all uiRoundness so theme gen has access to display previews.
      // consider limit this to a generator only stylesheet as users won't need them all in their themes.
      const allUiRoundnessProps = objectsToCSSProperties({ uiRoundness })

      usedTwCompProps = [...usedTwRoundnessKeys, ...usedTwSpacingKeys, ...usedTwFontKeys]

      let usedTwPropsString = usedTwCompProps.join('\n') + '\n' + allUiRoundnessProps

      await Promise.all(
        themes.map(async (theme: Theme) => {
          const builtCssPropsString = await builtTwThemeProps(theme, usedTwPropsString)
          if (builtCssPropsString) {
            const mergedTwPropsAndClassesCSS = builtCssPropsString + '\n' + mergedProcessedTwCSS
            const processedTwCSS = await prettier.format(mergedTwPropsAndClassesCSS, { parser: 'css' })

            await Bun.write(`dist/themes/theme-${theme.name}-tw.css`, processedTwCSS)

            await Bun.write(`../../apps/foliole.dev/src/theme-${theme.name}-tw.css`, processedTwCSS)
          }
        }),
      )
    } else {
      // Vanilla for Vanilla.
      // colors are generated last above, so need to merge them.
      const mergedCompsElsAndGenColors = { ...mergedCompsAndEls, ...backgrounds }
      // temp ignore until TS error is solved.
      // Excessive stack depth comparing types 'Root_' and 'Document_ | Root_'.ts(2321)
      // import postcssJs
      // @ts-ignore
      const processedCSS = await postcss().process(mergedCompsElsAndGenColors, { parser: postcssJs })
      const mergedProcessedCSS = processedCSS.css

      const cssPropsString = objectsToCSSProperties(folioleCSSProps)

      await Promise.all(
        themes.map(async (theme: Theme) => {
          const builtCssPropsString = await buildThemeProps(theme, cssPropsString)
          if (builtCssPropsString) {
            const mergedPropsAndClassesCSS = builtCssPropsString + '\n\n' + mergedProcessedCSS

            const processedCSS = await prettier.format(mergedPropsAndClassesCSS, { parser: 'css' })

            await Bun.write(`dist/themes/theme-${theme.name}.css`, processedCSS)
            await Bun.write(`../../apps/foliole.dev/src/theme-${theme.name}.css`, processedCSS)
          }
        }),
      )
    }
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()

export function twPlugin({ addComponents }: { addComponents: any }) {
  // Add Foliole Elements as components to Tailwind.
  addComponents(mergedEls)
}
