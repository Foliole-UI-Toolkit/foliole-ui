const postcssJs = require('postcss-js')
const postcss = require('postcss')
const fs = require('fs')

const { button } = require('../styles/elements/button')
const { input } = require('../styles/elements/input')
const { background } = require('../styles/tokens/background')
const { border } = require('../styles/tokens/border')
const { text } = require('../styles/tokens/text')
const { ui } = require('../styles/tokens/ui')
const { appShell } = require('../styles/components/app-shell')
const { appRail } = require('../styles/components/app-rail')

const mergedCssInJs = { ...button, ...input, ...background, ...border, ...text, ...ui, ...appShell, ...appRail }

;(async () => {
  try {
    const result = await postcss().process(mergedCssInJs, { parser: postcssJs })
    const mergedCss = result.css
    // for use with vanilla css
    fs.writeFileSync('../index.css', mergedCss, 'utf8')
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()

// for use with tailwind
module.exports = {
  button,
  input,
  background,
  text,
  ui,
}
