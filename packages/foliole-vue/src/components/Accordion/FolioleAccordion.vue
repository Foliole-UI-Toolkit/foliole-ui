<script lang="ts" setup>
import { provide } from 'vue'
import { useProvideAccordionStore } from './store.ts'

interface AccordionProps {
  autocollapse?: boolean
  detached?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
  autocollapse: false,
  detached: false,
})

useProvideAccordionStore()

provide('autocollapse', props.autocollapse)
provide('detached', props.detached)
</script>
<template>
  <div class="f0l__accordion-wrapper" data-testid="accordion">
    <slot />
  </div>
</template>
