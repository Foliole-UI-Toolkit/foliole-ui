import { folioleColorNames, stops } from './settings'

export type Theme = {
  contents: string
  name: string
}

export type FolioleColorName = typeof folioleColorNames
export type FolioleColorNames = (typeof folioleColorNames)[number]
export type Stops = (typeof stops)[number]

export interface ColorTypeOfString {
  [key: string]: Record<string, string>
  // Define other properties if needed
}

export interface ColorTypeOfObject {
  [key: string]: Record<string, Record<string, string>>
  // Define other properties if needed
}

export type ColorType = ColorTypeOfString | ColorTypeOfObject
