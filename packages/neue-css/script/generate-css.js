const postcssJs = require('postcss-js')
const postcss = require('postcss')
const fs = require('fs') // Import the fs module

const { button } = require('../styles/elements/button')
const { input } = require('../styles/elements/inputs')
const { background } = require('../styles/tokens/background')
const { text } = require('../styles/tokens/text')
const { ui } = require('../styles/tokens/ui')

const mergedCssInJs = { ...button, ...input, ...background, ...text, ...ui }

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
