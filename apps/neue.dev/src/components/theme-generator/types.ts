// -- Color Generator

import { neueColorNames, neueColorScale, neueColorSchemes, intensityMap } from './data/settings'

export type NeueColorNames = (typeof neueColorNames)[number] // Get the union type of the array's elements

export type NeueColorSchemes = (typeof neueColorSchemes)[number]

export type IntensityMap = (typeof intensityMap)[number]

export interface ColorSettings {
  key: NeueColorNames
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

export interface ColorsCollection {
  [key: string]: string | null
}

export type NeueColorScale = (typeof neueColorScale)[number]

export interface ThemeOptionsCollection {
  colors: ColorSettings[]
  derivedColors: ColorSettings[]
  btnOpts: BtnOpts
  fontOpts: FontOpts
  roundedBase: string
  borderBase: string
  primaryHex: string
}

export interface BtnFontSizes {
  sm: string
  base: number
  lg: string
}
