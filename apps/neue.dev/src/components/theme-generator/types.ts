// -- Color Generator

import { neueColorNames, neueColorScale, neueDerivedColorNames, additionalColorSchemes } from './data/settings'

export type NeueDerivedColorNames = (typeof neueDerivedColorNames)[number]

export type DerivedColorShades = { base: string }

export interface DerivedColors {
  key: NeueDerivedColorNames
  label: string
  shades: DerivedColorShades
}

export type NeueColorNames = (typeof neueColorNames)[number]

export type NeueAdditionalColorSchemes = (typeof additionalColorSchemes)[number]

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

export interface DerivedColors {
  key: NeueDerivedColorNames
  label: string
  hex: string
  rgb: string
  on: string
}

export interface ColorsCollection {
  [key: string]: string | null
}

export type NeueColorScale = (typeof neueColorScale)[number]

export interface ThemeOptionsCollection {
  colors: ColorSettings[]
  derivedColors: Record<NeueDerivedColorNames, DerivedColorShades>
  fontBase: string
  fontSecondary: string
  textColorLight: string
  textColorDark: string
  roundedBase: string
  borderBase: string
}

export const intensityMap: { [key: string]: number } = {
  light: 2.5,
  mlt: 1.75,
  mdk: 1.75,
  dark: 2.5,
}
