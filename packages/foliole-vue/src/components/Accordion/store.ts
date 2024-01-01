import { computed, ref } from 'vue'
import { createInjectionState } from '@vueuse/shared'

const [useProvideAccordionStore, useAccordionStore] = createInjectionState(
  () => {
    const activeItemId = ref<string | null>(null)

    const isActive = (itemId: string) => computed(() => activeItemId.value === itemId)

    function setActiveItem(itemId: string | null) {
      activeItemId.value = itemId
    }

    return { isActive, setActiveItem }
  },
  { injectionKey: 'AccordionStoreKey' },
)

export { useAccordionStore, useProvideAccordionStore }
