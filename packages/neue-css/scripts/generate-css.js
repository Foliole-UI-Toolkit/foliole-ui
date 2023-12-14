const postcssJs = require('postcss-js')
const postcss = require('postcss')
const fs = require('fs').promises
const path = require('path')

const neueTheme = require('../themes/neue.js')

// put all the themes in a array.
const themes = [neueTheme]

// Settings and Themes
const { colorNames, stops } = require('../settings')
const baseDir = path.join(__dirname, '..')

// Clear the require cache to force re-reading of modules
Object.keys(require.cache).forEach(function (key) {
  delete require.cache[key]
})

// Elements and Components
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
let twUtilities = {}

// All possible colors from the settings.
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

// Specific values from themes.
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

  const props = `${propsHeader} ${propsBase} ${propsFooter}`

  return props
}

const twPlugin = function ({ addComponents, addUtilities }) {
  const customComponents = {
    button,
    input,
  }

  const customUtilities = {
    ui,
  }

  // this will need to be a plugin within my package.
  for (const componentName in customComponents) {
    const component = customComponents[componentName]
    for (const className in component) {
      addComponents({
        [`${className}`]: component[className],
      })
    }
  }

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
    // Taking components, elements and tokens in putting int one file for usage vanilla or CSS agnostic solutions.
    const resultVanilla = await postcss().process(mergedCssInJsVanilla, { parser: postcssJs })
    const mergedVanillaCss = resultVanilla.css
    const neueVanillaPath = path.join(baseDir, 'neue.css')

    await fs.writeFile(neueVanillaPath, mergedVanillaCss, 'utf8')

    const resultTw = await postcss().process(mergedCssInJsTwComponents, { parser: postcssJs })
    const mergedTwCss = resultTw.css
    const neueTwPath = path.join(baseDir, 'neue-tw.css')

    await fs.writeFile(neueTwPath, mergedTwCss, 'utf8')

    const neueTwCSSPropertiesPath = path.join(baseDir, 'neue-tw-css-properties.css')

    const props = generateTwCSSProperties()
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
