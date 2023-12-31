import { writable } from 'svelte/store'

import { getContext, setContext } from 'svelte'

import { initThemeOptions } from '.'

import { initDerivedOptions } from './derived-stores'

const THEME_OPTIONS_KEY = 'themeOptionsStore'

export interface ThemeOptionsStore {
  subscribe: any
  set: any
  updateColor: (type: 'color' | 'derived', colorKey: string, value: any | string) => void
  updateColors: (type: 'colors' | 'derivedColors', updatedColors: any) => void
  updateBtnOpts: (value: any) => void
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
  // Only returning subscribe bc updates and sets should be done via these provided methods.
  const themeOptionsStoreInstance = writable<any>(initThemeOptions)

  const { subscribe, set, update } = themeOptionsStoreInstance

  return {
    subscribe,
    set,
    updateColor: (type: 'color' | 'derivedColors', colorKey: string, value: any | string) => {
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
        return {
          ...themeOptionsStore,
          [type]: themeOptionsStore[type].map((color: any, i: number) => {
            color.hex = updatedColors[color.key] as string
            return color
          }),
        }
      })
    },
    updateBtnOpts: (value: any) => {
      update((themeOptionsStore) => {
        themeOptionsStore.btnOpts = {
          ...themeOptionsStore.btnOpts,
          ...value,
        }
        return themeOptionsStore
      })
    },
    updateRoundedOpts: (value: any) => {
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
