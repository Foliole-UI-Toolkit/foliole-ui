import { type ComputedRef } from 'vue'

export interface AccordionStore {
  isActive: ComputedRef<(itemId: string) => boolean>
  setActiveItem: (itemId: string | null) => void
}
