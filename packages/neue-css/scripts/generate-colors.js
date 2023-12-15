// All possible colors from the settings which consome css props generated in generateThemeCSSProps.

const stopsMap = {
  light: 'dark',
  mlt: 'mdk',
  mdk: 'mlt',
  dark: 'light',
}

function generateColors(colorNames, stops, colorTypes) {
  colorNames.forEach((colorName) => {
    // TW colors
    colorTypes.twColors[colorName] = `rgb(var(--color-${colorName}) / <alpha-value>)`

    stops.forEach((stop) => {
      const comboName = `${colorName}-${stop}`
      colorTypes.twColors[comboName] = `rgb(var(--color-${colorName}-${stop}) / <alpha-value>)`
    })

    // All Background, Text, Border Colors
    colorTypes.backgrounds[`.bg-${colorName}`] = { backgroundColor: `rgb(var(--color-${colorName}))` }

    stops.forEach((stop) => {
      colorTypes.backgrounds[`.bg-${colorName}-${stop}`] = { backgroundColor: `rgb(var(--color-${colorName}))` }
    })

    // Variants
    colorTypes.variants[`.variant-${colorName}`] = { backgroundColor: `rgb(var(--color-${colorName}))` }

    stops.forEach((stop) => {
      colorTypes.variants[`.variant-${colorName}-${stop}`] = {
        backgroundColor: `rgb(var(--color-${colorName}))`,
      }
      colorTypes.variants[`.dark .variant-${colorName}-${stop}`] = {
        backgroundColor: `rgb(var(--color-${colorName}-${stopsMap[stop]}))`,
      }
    })

    // Dynamic text colors
  })
}

module.exports = generateColors
