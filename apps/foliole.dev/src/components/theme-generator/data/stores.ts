import { writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import { initThemeOptions } from '.'
import { initDerivedOptions } from './derived-stores'
import type { BtnOpts, ColorSettings, RoundedOpts, ThemeOptionsCollection } from '../types'

const THEME_OPTIONS_KEY = 'themeOptionsStore'

export interface ThemeOptionsStore {
  subscribe: (subscription: (value: ThemeOptionsCollection) => void) => () => void
  set: (value: ThemeOptionsCollection) => void
  updateColor: (type: 'color' | 'derivedColors', colorKey: string, value: Partial<ColorSettings> | string) => void

  updateColors: (updatedColors: Partial<ColorSettings>[]) => void

  updateBtnOpts: (value: Partial<BtnOpts>) => void
  updateRoundedOpts: (value: Partial<RoundedOpts>) => void
}

export function getThemeOptionsStore(): ThemeOptionsStore {
  const themeOptionsStore = getContext<ThemeOptionsStore | undefined>(THEME_OPTIONS_KEY)

  if (!themeOptionsStore) throw new Error('ThemeStore is not initialized!')

  return themeOptionsStore
}

export function initializeThemeOptionsStore() {
  const themeOptionsStore = themeOptionsService()
  const derivedThemeOptions = initDerivedOptions(themeOptionsStore)

  return {
    themeOptionsStore: setContext(THEME_OPTIONS_KEY, themeOptionsStore),
    derivedThemeOptions: derivedThemeOptions,
  }
}

function themeOptionsService() {
  const themeOptionsStoreInstance = writable<ThemeOptionsCollection>(initThemeOptions)

  const { subscribe, set, update } = themeOptionsStoreInstance

  return {
    subscribe,
    set,
    updateColor: (type: 'color' | 'derivedColors', colorKey: string, value: Partial<ColorSettings> | string) => {
      update((themeOptionsStore: ThemeOptionsCollection) => {
        const colorIndex = themeOptionsStore.colors.findIndex((color: ColorSettings) => color.key === colorKey)

        if (colorIndex === -1) {
          console.error(`Color with key '${colorKey}' not found.`)
          return themeOptionsStore
        }

        if (typeof value === 'string') {
          themeOptionsStore.colors[colorIndex].hex = value
        } else {
          themeOptionsStore.colors[colorIndex] = { ...themeOptionsStore.colors[colorIndex], ...value }
        }
        return themeOptionsStore
      })
    },
    updateColors: (updatedColors: Partial<ColorSettings>[]) => {
      update((themeOptionsStore) => {
        return {
          ...themeOptionsStore,
          colors: themeOptionsStore.colors.map((color: ColorSettings) => {
            const updatedColor = updatedColors.find((updatedColor) => updatedColor.key === color.key)
            if (updatedColor) {
              return { ...color, ...updatedColor }
            }
            return color
          }),
        }
      })
    },
    updateBtnOpts: (value: Partial<BtnOpts>) => {
      update((themeOptionsStore) => {
        themeOptionsStore.btnOpts = {
          ...themeOptionsStore.btnOpts,
          ...value,
        }
        return themeOptionsStore
      })
    },
    updateRoundedOpts: (value: Partial<RoundedOpts>) => {
      update((themeOptionsStore) => {
        themeOptionsStore.roundedOpts = {
          ...themeOptionsStore.roundedOpts,
          ...value,
        }
        return themeOptionsStore
      })
    },
  }
}
