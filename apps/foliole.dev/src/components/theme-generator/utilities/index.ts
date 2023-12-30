import chroma from 'chroma-js'

type ColorInput = string

type ColorName = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple'

export const centers = {
  red: 0,
  orange: 30,
  yellow: 60,
  green: 105,
  cyan: 165,
  blue: 225,
  'blue-info': 200,
  purple: 300,
}

export function createSaturation(hex: string) {
  const baseSaturation = getSaturation(hex)
  return baseSaturation > 0.79 ? baseSaturation : baseSaturation + 0.2
}

// ** useGetConvertedColor ** //

export function getHueFromHex(hexColor: string) {
  const hsl = chroma(hexColor).hsl()
  return hsl[0] // Hue is the first element in the HSL array
}

export function getRgbString(hex: string, separator: string = ' '): string {
  const sanitizedHex = hex.replaceAll('##', '#')
  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sanitizedHex)

  if (!colorParts) return '(invalid)'

  const [, r, g, b] = colorParts

  return `${parseInt(r, 16)}${separator}${parseInt(g, 16)}${separator}${parseInt(b, 16)}`
}

export function getRgbValues(color: ColorInput) {
  return chroma(color).rgb()
}

// ** useGetColorValue ** //

export function getLuminance(color: ColorInput) {
  return chroma(color).luminance()
}

export function getSaturation(color: ColorInput) {
  return chroma(color).hsl()[1]
}

// ** useGenerateColor** //

export function generateA11yOnColor(color: any): '255 255 255' | '0 0 0' {
  const black = calculateLuminanceRatio(color, '#000000')
  const white = calculateLuminanceRatio(color, '#FFFFFF')
  return black < white ? '0 0 0' : '255 255 255'
}

function generateRelativeHue(color: ColorName, distance: number, dir: string) {
  const rangeMultiplier: { [key in ColorName]: number } = {
    red: 2,
    orange: 1,
    yellow: 1,
    green: 2,
    cyan: 2,
    blue: 2,
    purple: 3,
  }

  if (dir === '') return centers[color]

  const multiplier = rangeMultiplier[color]
  const center = centers[color]

  if (dir === 'right') {
    return Math.floor((center + distance) * multiplier) % 360
  } else {
    // dir === 'left'
    let hue = Math.floor((center - distance) * multiplier) % 360
    return hue >= 0 ? hue : 360 + hue
  }
}

export function generateColorFromHSL(hue: number, sat: number, lum: number, type = 'hex') {
  if (type === 'hex') {
    return chroma(hue, sat, lum, 'hsl').hex()
  }
  console.warn('You passed in an unsupported type.')
  return null
}

export function generateDarkenedValue(color: string, by: number, type = 'hex') {
  if (type === 'hex') {
    return chroma(color).darken(by).hex()
  }
  console.warn('You passed in an unsupported type.')
  return null
}

export function generateLightenedValue(color: string, by: number, type = 'hex') {
  if (type === 'hex') {
    return chroma(color).brighten(by).hex()
  }
  console.warn('You passed in an unsupported type.')
  return null
}

export function generateRandomColor(type = 'hex') {
  if (type === 'hex') {
    return chroma.random().hex()
  }
  console.warn('You passed in an unsupported type.')
  return null
}

export function generateRotatedHue(color: string, by: string, type = 'hex') {
  if (type === 'hex') {
    return chroma(color).set('hsl.h', by).hex()
  }
  console.warn('You passed in an unsupported type.')
  return null
}

// ** Color Schemes ** //

export function generateAnalogousColors(
  color: string,
  by: number,
  type: 'analogous-triad' | 'analogous-quad' | 'analogous-quin',
) {
  let returnColors: string[] = []
  let map = {
    'analogous-triad': 3,
    'analogous-quad': 4,
    'analogous-quin': 5,
  }
  const count = map[type]
  // Create the colors
  Array.from({ length: count }).forEach((_, index) => {
    returnColors.push(generateRotatedHue(color, `+${by * (index + 1)}`) as string)
  })

  return returnColors
}

export function generateSplitComplimentaryColors(color: string) {
  const color2 = generateRotatedHue(color, '+190')
  const color3 = generateRotatedHue(color, '+170')
  return [color2, color3]
}

export function generateTriadColors(color: string) {
  const color2 = generateRotatedHue(color, '+120')
  const color3 = generateRotatedHue(color, '-120')
  return [color2, color3]
}

// ** Operations ** //

export function calculateLuminanceRatio(luminance1: string, luminance2: string) {
  const lum1 = getLuminance(luminance1)
  const lum2 = getLuminance(luminance2)

  if (lum1 === undefined || lum2 === undefined) throw new Error('Luminance is undefined!')
  // Calculate and return the contrast ratio based on the WCAG formula
  return lum1 > lum2 ? (lum2 + 0.05) / (lum1 + 0.05) : (lum1 + 0.05) / (lum2 + 0.05)
}

export function calculateNormalizedDistanceFromCenter(hue: number, color: ColorName, center: number) {
  const rangeMultiplier: { [key in ColorName]: number } = {
    red: 2,
    orange: 1,
    yellow: 1,
    green: 2,
    cyan: 2,
    blue: 2,
    purple: 3,
  }

  let distance: number
  if (color === 'red') {
    // Special handling for red due to wraparound at 360 degrees
    distance = Math.floor(Math.min(Math.abs(hue - center), 360 - hue))
  } else {
    distance = Math.floor(Math.abs(hue - center))
  }

  return distance / rangeMultiplier[color]
}

// ColorUtils object with nested categorization
// export const colorUtils = {
export const useGetConvertedColor = () => {
  return { getHueFromHex, getRgbString, getRgbValues }
}
export const useGetColorValue = () => {
  return {
    getLuminance,
    getSaturation,
  }
}
export const useGenerateColor = () => {
  return {
    generateA11yOnColor,
    generateColorFromHSL,
    generateDarkenedValue,
    generateLightenedValue,
    generateRandomColor,
    generateRelativeHue,
    generateRotatedHue,
  }
}
export const useColorSchemes = () => {
  return {
    generateAnalogousColors,
    generateSplitComplimentaryColors,
    generateTriadColors,
  }
}
export const useOperations = () => {
  return {
    calculateLuminanceRatio,
    calculateNormalizedDistanceFromCenter,
  }
}
// }
