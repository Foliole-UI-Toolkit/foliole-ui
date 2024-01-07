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

export type ElementRoundnessNames = (typeof elementRoundnessNames)[number]

export type ElementRoundnessTokens = (typeof elementRoundnessTokens)[number]

export type FolioleColorNames = (typeof folioleColorNames)[number]

export type FolioleColorSchemes = (typeof folioleColorSchemes)[number]

export type RoundedTokens = (typeof roundedTokens)[number]

export type RoundedNames = (typeof roundedNames)[number]

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
  paddingBase: string
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
  size: RoundedTokens
  btnRoundness: ElementRoundnessTokens
  inputRoundness: ElementRoundnessTokens
  colorSwatchRoundness: ElementRoundnessTokens
}

export type FolioleColorScale = (typeof folioleColorScale)[number]

export interface ThemeOptionsCollection {
  colors: ColorSettings[]
  btnOpts: BtnOpts
  fontOpts: FontOpts
  roundedOpts: RoundedOpts
  baseFontPxSize: string
  roundedBase: string
  borderBase: string
  primaryHex: string
}

export interface BtnFontSizes {
  sm: string
  base: number
  lg: string
}
