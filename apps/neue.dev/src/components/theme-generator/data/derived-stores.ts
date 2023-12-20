import { derived, get } from 'svelte/store'

export function initDerivedOptions(themeOptionsStore: any) {
  // TODO: fine tune these based on the default scale CSS Properties
  const btnSmPaddingBase = derived(themeOptionsStore, ($store: any) => {
    // btn padding base * sm btn padding size scale
    return Number($store.btnOpts.paddingBase) - 0.125 * $store.btnOpts.sizeScale
  })

  const btnLgPaddingBase = derived(themeOptionsStore, ($store: any) => {
    return Number($store.btnOpts.paddingBase) + 0.125 * $store.btnOpts.sizeScale
  })

  const btnChipPaddingBase = derived(themeOptionsStore, ($store: any) => {
    return (
      Number($store.btnOpts.paddingBase) - 0.25 * ($store.btnOpts.sizeScale > 1.375 ? 1.375 : $store.btnOpts.sizeScale)
    )
  })

  const btnSmPaddingWidth = derived(themeOptionsStore, ($store: any) => {
    return get(btnSmPaddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  const btnPaddingWidth = derived(themeOptionsStore, ($store: any) => {
    return Number($store.btnOpts.paddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  const btnLgPaddingWidth = derived(themeOptionsStore, ($store: any) => {
    return get(btnLgPaddingBase) * Number($store.btnOpts.paddingWidthScale)
  })

  const btnChipPaddingWidth = derived(themeOptionsStore, ($store: any) => {
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

export function initDerivedBuiltStrings(themeOptionsStore: any) {}
