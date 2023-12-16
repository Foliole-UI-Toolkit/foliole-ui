import { writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

import type { ThemeOptionsCollection } from '../types'

const THEME_OPTIONS_KEY = 'themeOptionsStore'

export function getModalStore() {
  const themeOptionsStore = getContext<ThemeOptionsCollection | undefined>(THEME_OPTIONS_KEY)

  if (!themeOptionsStore) throw new Error('ThemeStore is not initialized!')

  return themeOptionsStore
}

export function initializeModalStore() {
  const themeOptionsStore = themeOptionsService()

  return setContext(THEME_OPTIONS_KEY, themeOptionsStore)
}

function themeOptionsService() {
  const { subscribe, set, update } = writable<any>(initThemeOptions)

  // Only returning subscribe bc updates and sets should be done via these provided methods.
  return {
    subscribe,
    updateColor: (type: 'color' | 'derived', colorKey: string, value: any | string) => {
      update((themeOptionsStore) => {
        const colorIndex = themeOptionsStore[type].findIndex((color: any) => color.key === colorKey)
        // If the color with the given key does not exist in the array
        if (colorIndex === -1) {
          console.error(`Color with key '${colorKey}' not found.`)
          return
        }

        if (typeof value === 'string') {
          themeOptionsStore[type][colorIndex].hex = value
        } else {
          themeOptionsStore[type][colorIndex] = { ...themeOptionsStore[type][colorIndex], ...value }
        }
        return themeOptionsStore
      })
    },
    updateColors: (type: 'colors' | 'derivedColors', updatedColors: any) => {
      update((themeOptionsStore) => {
        console.log(type)
        return {
          ...themeOptionsStore,
          [type]: themeOptionsStore[type].map((color: any, i: number) => {
            color.hex = updatedColors[color.key] as string
            return color
          }),
        }
      })
    },
  }
}

const initThemeOptions = {
  colors: [
    {
      key: 'primary',
      label: 'Primary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'secondary',
      label: 'Secondary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'tertiary',
      label: 'Tertiary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'quat',
      label: 'Quaternary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'quin',
      label: 'Quinary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'neutral',
      label: 'Neutral',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'info',
      label: 'Info',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'mlt,base,mdk',
    },
    {
      key: 'success',
      label: 'Success',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'mlt,base,mdk',
    },
    {
      key: 'error',
      label: 'Error',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'mlt,base,mdk',
    },
    {
      key: 'warning',
      label: 'Warning',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'mlt,base,mdk',
    },
    {
      key: 'info',
      label: 'Info',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'mlt,base,mdk',
    },
  ],
  derivedColors: [
    {
      key: 'page',
      label: 'Page',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: '',
    },
    {
      key: 'page-contrast',
      label: 'Page Contrast',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: '',
    },
    {
      key: 'surface',
      label: 'Surface',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: '',
    },
    {
      key: 'surface-contrast',
      label: 'Surface Contrast',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: '',
    },
    {
      key: 'surface-raised',
      label: 'Surface Raised',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: '',
    },
    {
      key: 'surface-raised-contrast',
      label: 'Surface Raised Contrast',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: '',
    },
  ],
  primaryHex: '#ef4953',
  roundedBase: '9999px',
  borderBase: '1px',
  button: {
    paddingBase: '0.5',
    paddingWidthScale: '3.5',
    sizeScale: '.25',
    hoverScale: '1.1',
    activeScale: '0.9',
    hoverBrightnessScale: '1.05',
    activeBrightnessScale: '0.95',
    fontSizeSm: '0.75',
    fontSize: '1',
    fontSizeLg: '1.25',
  },
  font: {
    base: '1',
    secondary: '1',
    size: '1',
    textColorLight: '0 0 0',
    textColorDark: '255 255 255',
  },
  rounded: {
    size: '0',
    btnRoundness: '0',
    inputRoundness: '0',
    colorSwatchRoundness: '0',
  },
}
