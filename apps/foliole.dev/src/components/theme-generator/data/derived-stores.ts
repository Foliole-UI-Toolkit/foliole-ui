import { derived, get, type Readable } from 'svelte/store'
import type { BtnOpts } from '../types'

interface LocalBtnOpts {
  paddingBase: string
  sizeScale: string
  paddingWidthScale: string
}

type PartialBtnOpts = Partial<BtnOpts> & LocalBtnOpts

interface ThemeOptionsStore {
  btnOpts: PartialBtnOpts
}

export function initDerivedOptions(themeOptionsStore: Readable<ThemeOptionsStore>) {
  const btnSmPaddingBase = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return Number($store.btnOpts.paddingBase) - 0.125 * Number($store.btnOpts.sizeScale)
  })

  const btnLgPaddingBase = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return Number($store.btnOpts.paddingBase) - 0.125 * Number($store.btnOpts.sizeScale)
  })

  const btnChipPaddingBase = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return (
      Number($store.btnOpts.paddingBase) -
      0.25 * (Number($store.btnOpts.sizeScale) > 1.375 ? 1.375 : Number($store.btnOpts.sizeScale))
    )
  })

  const btnSmPaddingWidth = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return get(btnSmPaddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  const btnPaddingWidth = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return Number($store.btnOpts.paddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  const btnLgPaddingWidth = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return get(btnLgPaddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  const btnChipPaddingWidth = derived(themeOptionsStore, ($store: ThemeOptionsStore) => {
    return get(btnChipPaddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  return {
    btnSmPaddingBase,
    btnLgPaddingBase,
    btnChipPaddingBase,
    btnSmPaddingWidth,
    btnPaddingWidth,
    btnLgPaddingWidth,
    btnChipPaddingWidth,
  }
}
