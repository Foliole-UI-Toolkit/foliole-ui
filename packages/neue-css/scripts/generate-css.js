// Package imports
const postcssJs = require('postcss-js')
const postcss = require('postcss')
const fs = require('fs').promises
const path = require('path')

// Settings and Themes
const neueTheme = require('../themes/neue.js')
const { colorNames, stops } = require('../settings/index.js')

// Helper script imports
const { toCSSProperties } = require('./index.js')
const generateColors = require('./generate-colors.js')

// Elements, Properties, Utilities, Tokens and Components - see docs for clarity on how Neue and TW define these.
const { btn } = require('../styles/elements/btn.js')
const { input } = require('../styles/elements/input.js')
const { spacing } = require('../styles/properties/spacing.js')
const uiRoundness = require('../styles/properties/roundness.js')
const { appShell } = require('../styles/components/app-shell.js')
const { appRail } = require('../styles/components/app-rail.js')
const { accordion } = require('../styles/components/accordion.js')
const { slideToggle } = require('../styles/components/slide-toggle.js')

const AT_TW_BASE = '@tailwind base;'
const AT_TW_COMPONENTS = '@tailwind components;'
const AT_TW_UTILITIES = '@tailwind utilities;'

const baseDir = path.join(__dirname, '..')
// put all the themes in a array.

// Taking components, elements and tokens and merging into an object.
let mergedCSSInJsCompsAndElsForVanilla = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...slideToggle,
  ...btn,
  ...input,
}

let twColors = {}
let backgrounds = {}
let variants = {}
let neueCSSProps = ''

// object will hold a ref to these objects.
let colorTypes = {
  twColors,
  backgrounds,
  variants,
}

// Taking components (elements and tokens handled by tailwind settings) and merging into an object.
// Components use elements and tokens.
const mergedCSSInJsCompsForTW = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...slideToggle,
}

// Specific values from themes to be used as CSS properties in TW.
// function generateNeueTokens(theme) {
//   const tokens = []

//   Object.keys(theme).forEach((token) => {
//     tokens.push([[token], theme[token]])
//   })

//   const results = tokens.map(([token, tokenValue]) => {
//     const css = toCSSProperties(token, tokenValue)
//     return `${css}`
//   })

//   return results.join('\n')
// }

function generateNeueProps() {
  const spacingCSS = toCSSProperties('spacing', spacing)
  const roundnessCSS = toCSSProperties('ui-roundness', uiRoundness['ui-roundness'])

  const combinedCSS = spacingCSS + '\n' + roundnessCSS

  return combinedCSS
}
// Neue Elements as Components for Tailwind.
const twPlugin = function ({ addComponents, addUtilities }) {
  // Custom components(TW)/Elements(Neue). Neue Components are generated in their own files.
  const customComponents = {
    btn,
    input,
  }
  // Components(TW)/Elements(Neue) consume tokens.
  for (const componentName in customComponents) {
    const component = customComponents[componentName]
    for (const className in component) {
      addComponents({
        [`${className}`]: component[className],
      })
    }
  }
}

// Perform async file actions.
;(async () => {
  try {
    // we don't need to return colorTypes because the object holds the reference the original objects.
    generateColors(colorNames, stops, colorTypes)

    mergedCSSInJsCompsAndElsForVanilla = { ...mergedCSSInJsCompsAndElsForVanilla, ...backgrounds, ...variants }

    // Vanilla CSS - post process into file for tw solution
    const resultVanilla = await postcss().process(mergedCSSInJsCompsAndElsForVanilla, { parser: postcssJs })
    const mergedVanillaCSS = resultVanilla.css
    const neueVanillaPath = path.join(baseDir, 'neue.css')
    await fs.writeFile(neueVanillaPath, mergedVanillaCSS, 'utf8')

    // Neue components - post process into file for tw solutions.
    const resultTw = await postcss().process(mergedCSSInJsCompsForTW, { parser: postcssJs })
    const mergedTwCSS = resultTw.css
    const neueForTwPath = path.join(baseDir, 'neue-for-tw.css')
    await fs.writeFile(neueForTwPath, mergedTwCSS, 'utf8')

    // CSS properties for use with tailwind.
    // Header and footer for props file.
    const propsHeader = `${AT_TW_BASE} \n ${AT_TW_COMPONENTS} \n ${AT_TW_UTILITIES} \n @layer base {\n:root {`
    const propsFooter = `}\n}`
    // Generate both theme specific props and neue default props.
    neueCSSProps = generateNeueProps()
    const themeCSSProps = neueTheme.theme

    const props = `${propsHeader} ${themeCSSProps} ${neueCSSProps} ${propsFooter}`

    // Create file.
    const neueTwCSSPropertiesPath = path.join(baseDir, 'neue-tw-css-properties.css')
    await fs.writeFile(neueTwCSSPropertiesPath, props, 'utf8')
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()

// For use with tailwind.
module.exports = {
  twPlugin,
  neueCSSProps,
  twColors,
}
