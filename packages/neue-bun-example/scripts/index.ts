import type { NeueColorName, ColorType, Stops } from '../types.ts'
const { stringify } = require('javascript-stringify')

export function toCSSProperties<T>(token: NeueColorName, obj: Record<string, T>) {
  let cssString = ''

  Object.keys(obj).forEach((key) => {
    const cssKey = `--${token}-${key.replace('.', 'pt')}`
    const cssValue = obj[key]
    cssString += ` ${cssKey}: ${cssValue};\n`
  })

  return cssString
}

const stopsMap = {
  light: 'dark',
  mlt: 'mdk',
  mdk: 'mlt',
  dark: 'light',
}

const stopType = {
  light: 'light',
  mlt: 'light',
  mdk: 'dark',
  dark: 'dark',
}

function generateColors(colorNames: string[], stops: Stops[], colorTypes: ColorType) {
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
    colorTypes.variants[`.variant-${colorName}`] = {
      backgroundColor: `rgb(var(--color-${colorName}))`,
      color: `rgb(var(--color-on-${colorName}))`,
    }

    stops.forEach((stop) => {
      colorTypes.variants[`.variant-${colorName}-${stop}`] = {
        backgroundColor: `rgb(var(--color-${colorName}))`,
        color: `rgb(${stopType[stop] === 'light' ? '0, 0, 0' : '255, 255, 255'})`,
      }
      colorTypes.variants[`.dark .variant-${colorName}-${stop}`] = {
        backgroundColor: `rgb(var(--color-${colorName}-${stopsMap[stop]}))`,
        color: `rgb(${stopType[stop] === 'light' ? '255, 255, 255' : '0, 0, 0'})`,
      }
    })

    // Dynamic text colors
  })
}

module.exports = generateColors
