import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

import { localStorageStore } from '@skeletonlabs/skeleton'
import type { ThemeOptionsCollection } from '../types'

export const storeThemeOptions: Writable<ThemeOptionsCollection> = localStorageStore('storeThemeOptions', {
  colors: [
    {
      key: 'primary',
      label: 'Primary',
      hex: '#f00a0a',
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
      key: 'quaternary',
      label: 'Quaternary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
      stops: 'light,mlt,base,mdk,dark',
    },
    {
      key: 'quinary',
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
  ],
  derivedColors: [
    {
      key: 'page',
      label: 'Primary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
    },
    {
      key: 'page-contrast',
      label: 'Primary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
    },
    {
      key: 'surface',
      label: 'Primary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
    },
    {
      key: 'surface-contrast',
      label: 'Primary',
      hex: '',
      rgb: '0 0 0',
      on: '0 0 0',
    },
  ],
  fontBase: 'system',
  fontSecondary: 'system',
  textColorLight: '0 0 0',
  textColorDark: '255 255 255',
  roundedBase: '9999px',
  borderBase: '1px',
})

export const storeColorResults = writable([])
