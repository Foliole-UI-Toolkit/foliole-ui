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

// Elements, Properties, Classes and Components - see docs for clarity on how Neue and TW define these.
const { button } = require('../styles/elements/button.js')
const { input } = require('../styles/elements/input.js')
// const { background } = require('../styles/tokens/background.js')
// const { border } = require('../styles/tokens/border.js')
// const { text } = require('../styles/tokens/text.js')
const { spacing } = require('../styles/properties/spacing.js')
const { borderRadius } = require('../styles/properties/border-radius.js')
const { appShell } = require('../styles/components/app-shell.js')
const { appRail } = require('../styles/components/app-rail.js')
const { accordion } = require('../styles/components/accordion.js')
const { slideToggle } = require('../styles/components/slide-toggle.js')

const AT_TW_BASE = '@tailwind base;'
const AT_TW_COMPONENTS = '@tailwind components;'
const AT_TW_UTILITIES = '@tailwind utilities;'

const baseDir = path.join(__dirname, '..')
// put all the themes in a array.
const themes = [neueTheme]

// Taking components, elements and tokens and merging into an object.
// const mergedCSSInJsVanilla = {
//   ...accordion,
//   ...appRail,
//   ...appShell,
//   ...slideToggle,
//   ...background,
//   ...border,
//   ...button,
//   ...input,
//   ...text,
//   ...ui,
// }

let twColors = {}

// Taking components (elements and tokens handled by tailwind settings) and merging into an object.
// Components use elements and tokens.
const mergedCSSInJsTwComponents = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...slideToggle,
}

// All possible colors from the settings which consome css props generated in generateThemeCSSProps.
function generateTwColors(colorNames, stops) {
  const colors = {}

  colorNames.forEach((colorName) => {
    if (stops.includes('base')) {
      colors[colorName] = `rgb(var(--color-${colorName}) / <alpha-value>)`
    }

    stops.forEach((stop) => {
      const comboName = `${colorName}-${stop}`
      colors[comboName] = `rgb(var(--color-${colorName}-${stop}) / <alpha-value>)`
    })
  })

  return colors
}

// Specific values from themes to be used as CSS properties in TW.
function generateThemeCSSProps() {
  const tokens = []

  themes.forEach((theme) => {
    Object.keys(theme).forEach((token) => {
      tokens.push([[token], theme[token]])
    })
  })

  const results = tokens.map(([token, tokenValue]) => {
    const css = toCSSProperties(token, tokenValue)
    return `${css}`
  })

  return results.join('\n')
}

function generateNeueDefaultCSSProps() {
  const spacingCSS = toCSSProperties('spacing', spacing)
  const borderRadiusCSS = toCSSProperties('border-radius', borderRadius)

  const combinedCSS = spacingCSS + '\n' + borderRadiusCSS

  return combinedCSS
}

const twPlugin = function ({ addComponents, addUtilities }) {
  // Custom components(TW)/Elements(Neue). Neue Components are generated in their own files.
  const customComponents = {
    button,
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

twColors = generateTwColors(colorNames, stops)

// Perform async file actions.
;(async () => {
  try {
    // Vanilla CSS - post process into file for tw solution
    // const resultVanilla = await postcss().process(mergedCSSInJsVanilla, { parser: postcssJs })
    // const mergedVanillaCSS = resultVanilla.css
    // const neueVanillaPath = path.join(baseDir, 'neue.css')
    // Component class file use with non-tailwind solutions.
    // await fs.writeFile(neueVanillaPath, mergedVanillaCSS, 'utf8')

    // Neue components - post process into file for tw solutions.
    const resultTw = await postcss().process(mergedCSSInJsTwComponents, { parser: postcssJs })
    const mergedTwCSS = resultTw.css
    const neueForTwPath = path.join(baseDir, 'neue-for-tw.css')
    await fs.writeFile(neueForTwPath, mergedTwCSS, 'utf8')

    // CSS properties for use with tailwind.
    // Header and footer for props file.
    const propsHeader = `${AT_TW_BASE} \n ${AT_TW_COMPONENTS} \n ${AT_TW_UTILITIES} \n @layer base {\n:root {`
    const propsFooter = `}\n}`
    // Generate both theme specific props and neue default props.
    const themeCSSProps = generateThemeCSSProps()
    const neueCSSProps = generateNeueDefaultCSSProps()
    const props = `${propsHeader} ${themeCSSProps} ${neueCSSProps} ${propsFooter}`

    console.log(props)
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
  twColors,
}
