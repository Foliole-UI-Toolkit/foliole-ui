// -- Color Generator

import {
  elementRoundnessNames,
  elementRoundnessTokens,
  folioleColorNames,
  folioleColorScale,
  folioleColorSchemes,
  intensityMap,
  roundedNames,
  roundedTokens,
} from './data/settings'

// Types based on settings data

export type ElementRoundnessNames = (typeof elementRoundnessNames)[number]

export type ElementRoundnessTokens = (typeof elementRoundnessTokens)[number]

export type FolioleColorNames = (typeof folioleColorNames)[number]

export type FolioleColorScale = (typeof folioleColorScale)[number]

export type FolioleColorSchemes = (typeof folioleColorSchemes)[number]

export type IntensityMap = (typeof intensityMap)[number]

export type RoundedTokens = (typeof roundedTokens)[number]

export type RoundedNames = (typeof roundedNames)[number]

export interface BtnFontSizes {
  base: number
  lg: string
  sm: string
}

export interface BtnOpts {
  activeBrightnessScale: string
  activeScale: string
  fontSize: string
  fontSizeLg: string
  fontSizeSm: string
  hoverBrightnessScale: string
  hoverScale: string
  paddingBase: string
  paddingWidthScale: string
  sizeScale: string
}

export interface ColorSettings {
  key: FolioleColorNames
  label: string
  hex: string
  rgb: string
  on: string
  stops: string
}

export interface FontOpts {
  base: string
  secondary: string
  size: string
  textColorLight: string
  textColorDark: string
}

export interface RoundedOpts {
  btnRoundness: ElementRoundnessTokens
  colorSwatchRoundness: ElementRoundnessTokens
  inputRoundness: ElementRoundnessTokens
  size: RoundedTokens
}

export interface ThemeOptionsCollection {
  baseFontPxSize: string
  borderBase: string
  btnOpts: BtnOpts
  colors: ColorSettings[]
  fontOpts: FontOpts
  primaryHex: string
  roundedBase: string
  roundedOpts: RoundedOpts
}
