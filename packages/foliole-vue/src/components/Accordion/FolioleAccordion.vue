<script lang="ts" setup>
import { provide } from 'vue'
import { useProvideAccordionStore } from './store.ts'

interface AccordionProps {
  autocollapse?: boolean
  detached?: boolean
  accordionWrapperClasses?: string
}

const props = withDefaults(defineProps<AccordionProps>(), {
  autocollapse: false,
  detached: false,
  accordionWrapperClasses: 'foliole-v_0_accordion-wrapper',
})

useProvideAccordionStore()

provide('autocollapse', props.autocollapse)
provide('detached', props.detached)
</script>
<template>
  <div :class="accordionWrapperClasses" data-testid="accordion">
    <slot />
  </div>
</template>
