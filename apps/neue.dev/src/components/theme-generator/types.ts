// -- Color Generator

import {
  neueColorNames,
  neueColorScale,
  neueColorSchemes,
  neueDerivedColorNames,
  additionalColorSchemes,
  intensityMap,
} from './data/settings'

export type NeueColorNames = (typeof neueColorNames)[number] // Get the union type of the array's elements
export type NeueDerivedColorNames = (typeof neueDerivedColorNames)[number] // Get the union type of the array's elements

export type DerivedColorShades = { base: string }

export type NeueAdditionalColorSchemes = (typeof additionalColorSchemes)[number]

export type NeueAdditionalColorSchemesMapKeys = {
  [Key in NeueAdditionalColorSchemes]?: string
}

export type NeueColorSchemes = (typeof neueColorSchemes)[number]

export type IntensityMap = (typeof intensityMap)[number]

export interface SurfaceLevelMap {
  [key: string]: {
    page: number
    surface: number
    raised: number
  }
}

export interface ColorSettings {
  key: NeueColorNames | NeueDerivedColorNames
  label: string
  hex: string
  rgb: string
  on: string
  stops: string
}

export interface ColorsCollection {
  [key: string]: string | null
}

export type NeueColorScale = (typeof neueColorScale)[number]

export interface ThemeOptionsCollection {
  colors: ColorSettings[]
  derivedColors: ColorSettings[]
  fontBase: string
  fontSecondary: string
  textColorLight: string
  textColorDark: string
  roundedBase: string
  borderBase: string
}

export interface BtnFontSizes {
  sm: string
  base: number
  lg: string
}
