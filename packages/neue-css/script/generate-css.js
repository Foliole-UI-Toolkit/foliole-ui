const postcssJs = require('postcss-js')
const postcss = require('postcss')
const fs = require('fs') // Import the fs module

const { button } = require('../styles/elements/button')
const { background } = require('../styles/tokens/background')
const { ui } = require('../styles/tokens/ui')

const mergedCssInJs = { ...button, ...background, ...ui }

;(async () => {
  try {
    const result = await postcss().process(mergedCssInJs, { parser: postcssJs })
    const mergedCss = result.css

    fs.writeFileSync('../index.css', mergedCss, 'utf8')
  } catch (error) {
    console.error('Error occurred:', error)
  }
})()

module.exports = {
  button,
  background,
  ui,
}
