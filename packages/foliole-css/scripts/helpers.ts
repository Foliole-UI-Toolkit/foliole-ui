import { stringify } from 'javascript-stringify'
import type { FolioleColorNames, ColorType, Stops, Theme } from '../types.ts'
import { AT_TW_BASE, AT_TW_COMPONENTS, AT_TW_UTILITIES } from '../settings/index.ts'
import { camelToKebab } from './utils.ts'

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

// Generate colors in several contexts for the theme.
export function generateColors(colorNames: string[] | FolioleColorNames[], stops: Stops[], colorTypes: ColorType) {
  colorNames.forEach((colorName: string) => {
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

    // Temp commented out until flushed-out variants solution is realized. Keeping to avoid repeating work.

    // Variants
    // colorTypes.variants[`.variant-${colorName}`] = {
    //   backgroundColor: `rgb(var(--color-${colorName}))`,
    //   color: `rgb(var(--color-on-${colorName}))`,
    // }

    // stops.forEach((stop) => {
    //   colorTypes.variants[`.variant-${colorName}-${stop}`] = {
    //     backgroundColor: `rgb(var(--color-${colorName}))`,
    //     color: `rgb(${stopType[stop] === 'light' ? '0, 0, 0' : '255, 255, 255'})`,
    //   }
    //   colorTypes.variants[`.dark .variant-${colorName}-${stop}`] = {
    //     backgroundColor: `rgb(var(--color-${colorName}-${stopsMap[stop]}))`,
    //     color: `rgb(${stopType[stop] === 'light' ? '255, 255, 255' : '0, 0, 0'})`,
    //   }
    // })

    // Dynamic text colors
  })
}

// Function to get only CSS Props used in our Components for TW.
export async function getUsedCSSProps(
  prop: Record<string, string>,
  propName: string,
  mergeCSSInJSCompsAndElementsForTw: any,
  propLookup: null | Record<string, string> = null,
) {
  const foundKeys = new Set<string>()

  for (const cssClass of Object.values(mergeCSSInJSCompsAndElementsForTw)) {
    const cssString = stringify(cssClass, null, 2)

    if (cssString) {
      for (const key of Object.keys(prop)) {
        const propKey = `--${propName}-${key.replace('.', 'pt')}`

        const propKeyInContext = `var(${propKey})`

        let propKeyAndValue = ''

        if (propLookup) {
          const tailAsKey = prop[key].split('-').pop()
          if (tailAsKey === undefined) {
            console.error('error in key lookup')
            return []
          }
          propKeyAndValue = `${prop[key]}: ${propLookup[tailAsKey]};`
        } else {
          propKeyAndValue = `${propKey}: ${prop[key]};`
        }

        if (cssString.includes(propKeyInContext)) {
          foundKeys.add(propKeyAndValue)
        }
      }
    }
  }
  return [...foundKeys].sort((a: string, b: string) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0')
    const numB = parseInt(b.match(/\d+/)?.[0] || '0')
    if (isNaN(numA) || isNaN(numB)) {
      return a.localeCompare(b)
    }
    return numA - numB
  })
}

export function objectToCSSProperties<T>(token: string, obj: Record<string, T>) {
  let cssString = ''
  const kebabToken = camelToKebab(token)

  Object.keys(obj).forEach((key) => {
    const cssKey = `--${kebabToken}-${key.replace('.', 'pt')}`
    const cssValue = obj[key]
    cssString += ` ${cssKey}: ${cssValue};\n`
  })

  return cssString
}

export function objectsToCSSProperties(cssProps: Record<string, any>) {
  let cssString = ''

  Object.keys(cssProps).forEach((key) => {
    const cssProperties = objectToCSSProperties(key, cssProps[key])
    cssString += cssProperties + '\n'
  })

  return cssString
}

export async function buildThemeProps(theme: Theme, cssPropsString: string) {
  const propsHeader = ` :root {`
  const propsFooter = `}`

  return `${propsHeader} ${cssPropsString} ${theme.contents} ${propsFooter}`
}

export async function builtTwThemeProps(theme: Theme, cssPropsString: string) {
  const twPropsHeader = `${AT_TW_BASE} \n ${AT_TW_COMPONENTS} \n ${AT_TW_UTILITIES} \n @layer base {\n:root {`
  const twPropsFooter = `}\n}`

  return `${twPropsHeader} ${cssPropsString} ${theme.contents} ${twPropsFooter}`
}
