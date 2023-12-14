const { stringify } = require('javascript-stringify')
const prettierCSS = require('prettier/parser-postcss')
const prettier = require('prettier/standalone')

function format(css) {
  return prettier.format(css, {
    parser: 'css',
    plugins: [prettierCSS],
  })
}

function toCSS(selector, object) {
  return format(
    `${selector} ${stringify(
      object,
      (value, indent, stringify) => (typeof value === 'string' ? value : stringify(value)),
      2,
    )?.replace(/,\n/g, ';\n')}`,
  )
}

function toCSSProperties(token, obj) {
  let cssString = ''

  Object.keys(obj).forEach((key) => {
    const cssKey = `--${token}-${key.replace('.', 'pt')}`
    const cssValue = obj[key]
    cssString += ` ${cssKey}: ${cssValue};\n`
  })

  return cssString
}

module.exports = {
  toCSS,
  toCSSProperties,
}
