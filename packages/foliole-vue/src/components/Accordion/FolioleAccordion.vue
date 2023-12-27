<script lang="ts" setup>
import { computed, ref, provide } from 'vue'
import { createInjectionState } from '@vueuse/shared'

interface AccordionProps {
  autocollapse?: boolean
  detached?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
  autocollapse: false,
  detached: false,
})

const [useProvideAccordionStore, useAccordionStore] = createInjectionState(
  () => {
    const activeItemId = ref<string | null>(null)

    const isActive = computed(() => {
      return activeItemId.value
    })

    function setActiveItem(itemId: string | null) {
      activeItemId.value = itemId
    }

    return { isActive, setActiveItem }
  },
  { injectionKey: 'AccordionStoreKey' },
)

useProvideAccordionStore()
provide('useAccordionStore', useAccordionStore)
provide('autocollapse', props.autocollapse)
provide('detached', props.detached)
</script>
<template>
  <div class="accordion" data-testid="accordion">
    <slot />
  </div>
</template>
