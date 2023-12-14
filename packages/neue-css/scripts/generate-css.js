// Imports
const postcssJs = require('postcss-js')
const postcss = require('postcss')
const fs = require('fs').promises
const path = require('path')

// Settings and Themes
const neueTheme = require('../themes/neue.js')
const { colorNames, stops } = require('../settings')

// Elements, Tokens and Components
const { button } = require('../styles/elements/button')
const { input } = require('../styles/elements/input')
const { background } = require('../styles/tokens/background')
const { border } = require('../styles/tokens/border')
const { text } = require('../styles/tokens/text')
const { ui } = require('../styles/tokens/ui')
const { appShell } = require('../styles/components/app-shell')
const { appRail } = require('../styles/components/app-rail')
const { accordion } = require('../styles/components/accordion')
const { slideToggle } = require('../styles/components/slide-toggle')

const baseDir = path.join(__dirname, '..')
// put all the themes in a array.
const themes = [neueTheme]

// Note Neue and TW have slightly different naming conventions. Neue defines components as complex features which have a JS framework counterpart.
// Neue defines elements  as CSS only, and are used as TW components.

// Utilities are design tokens. They are used in Neue Elements/TW components. Design tokens are classes piped into tw as utilities. They are useful for scenarios such as a single rounded value for the theme. Padding for buttons/inputs etc. Dynamic light/dark values.

// Additionally, some are also created for use outside of tw to easily pass into framework components (ie bg-primary is created by tw when colors are created. But also supplied by Neue for all CSS solutions as easy ways to pass in class options.)

// Taking components, elements and tokens and merging into an object.
const mergedCssInJsVanilla = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...slideToggle,
  ...background,
  ...border,
  ...button,
  ...input,
  ...text,
  ...ui,
}

// Taking components (elements and tokens handled by tailwind settings) and merging into an object.
// Components use elements and tokens.
const mergedCssInJsTwComponents = {
  ...accordion,
  ...appRail,
  ...appShell,
  ...slideToggle,
}

let twColors = {}

// All possible colors from the settings which consome css props generated in generateTwCSSProperties.
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
function generateTwCSSProperties() {
  let propsHeader = `@tailwind base; \n @layer base {\n:root {`
  let propsBase = ''
  let propsFooter = `}\n}`

  themes.forEach((theme) => {
    Object.keys(theme).forEach((option) => {
      const themeOptions = theme[option]

      Object.keys(themeOptions).forEach((key) => {
        propsBase += `    --${option}-${key}: ${themeOptions[key]}; \n`
      })
    })
  })

  return `${propsHeader} ${propsBase} ${propsFooter}`
}

const twPlugin = function ({ addComponents, addUtilities }) {
  // Custom components, called "elements" in Neue. Neue Components are generated in their own files.
  const customComponents = {
    button,
    input,
  }

  // Custom utilities used in components. Not all are needed as tw makes bg, border etc from colors.
  const customUtilities = {
    ui,
  }

  // Components which consume elements and tokens.
  for (const componentName in customComponents) {
    const component = customComponents[componentName]
    for (const className in component) {
      addComponents({
        [`${className}`]: component[className],
      })
    }
  }

  // Custom utilities used in components.
  for (const utilityName in customUtilities) {
    const component = customComponents[utilityName]
    for (const className in component) {
      addUtilities({
        [`${className}`]: component[className],
      })
    }
  }
}

twColors = generateTwColors(colorNames, stops)

// Perform async file actions.
;(async () => {
  try {
    // Neue components, elements and tokens and concating into single file for vanilla/CSS agnostic solutions.
    const resultVanilla = await postcss().process(mergedCssInJsVanilla, { parser: postcssJs })
    const mergedVanillaCss = resultVanilla.css
    const neueVanillaPath = path.join(baseDir, 'neue.css')
    // Component class file use with non-tailwind solutions.
    await fs.writeFile(neueVanillaPath, mergedVanillaCss, 'utf8')

    // Neue components concating into single file for tw solutions.
    const resultTw = await postcss().process(mergedCssInJsTwComponents, { parser: postcssJs })
    const mergedTwCss = resultTw.css
    const neueTwPath = path.join(baseDir, 'neue-tw.css')
    // Component class file for use with tailwind.
    await fs.writeFile(neueTwPath, mergedTwCss, 'utf8')

    // CSS properties for use with tailwind.
    const neueTwCSSPropertiesPath = path.join(baseDir, 'neue-tw-css-properties.css')
    const props = generateTwCSSProperties()
    // CSS props file for use with tailwind.
    await fs.writeFile(neueTwCSSPropertiesPath, props, 'utf8')
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()

// for use with tailwind

module.exports = {
  twPlugin,
  twColors,
}
