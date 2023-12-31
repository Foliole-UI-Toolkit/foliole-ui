// -- Color Generator

import { folioleColorNames, folioleColorScale, folioleColorSchemes, intensityMap } from './data/settings'

export type FolioleColorNames = (typeof folioleColorNames)[number] // Get the union type of the array's elements

export type FolioleColorSchemes = (typeof folioleColorSchemes)[number]

export type IntensityMap = (typeof intensityMap)[number]

export interface ColorSettings {
  key: FolioleColorNames
  label: string
  hex: string
  rgb: string
  on: string
  stops: string
}

export interface BtnOpts {
  paddingWidthScale: string
  sizeScale: string
  hoverScale: string
  activeScale: string
  hoverBrightnessScale: string
  activeBrightnessScale: string
  fontSizeSm: string
  fontSize: string
  fontSizeLg: string
}

export interface FontOpts {
  base: string
  secondary: string
  size: string
  textColorLight: string
  textColorDark: string
}

export interface RoundedOpts {
  size: string
  btnRoundness: string
  inputRoundness: string
  colorSwatchRoundness: string
}

export type FolioleColorScale = (typeof folioleColorScale)[number]

export interface ThemeOptionsCollection {
  colors: ColorSettings[]
  derivedColors: ColorSettings[]
  btnOpts: BtnOpts
  fontOpts: FontOpts
  roundedOpts: RoundedOpts

  roundedBase: string
  borderBase: string
  primaryHex: string
}

export interface BtnFontSizes {
  sm: string
  base: number
  lg: string
}
