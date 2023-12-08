<script lang="ts" setup>
import type { AccordionStore } from './types'
import { computed, inject, ref, watch, withDefaults } from 'vue'
import classNames from 'classnames'

const useAccordionStore = inject<AccordionStore>('useAccordionStore')
const autocollapse = inject<boolean>('autocollapse')

const { isActive, setActiveItem } = useAccordionStore()

const emits = defineEmits(['toggle'])

interface AccordionItemProps {
  open?: boolean
  accordionItemClasses?: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  open: false,
  accordionItemClasses: 'accordion-item',
  headerControlClasses: 'header-control',
})

const isOpen = ref<boolean>(props.open)
const currentOpenState = ref(isOpen.value)
const itemId = ref(String(Math.random()))

const openedItemClass = computed(() => currentOpenState.value && 'opened')

const mergedAccordionItemClasses = computed(() => classNames([props.accordionItemClasses, openedItemClass.value]))

function onToggle(event?: MouseEvent) {
  currentOpenState.value = autocollapse ? isActive.value === itemId.value : isOpen.value

  const toggleEvent = {
    event,
    id: `accordion-control-${itemId.value}`,
    open: currentOpenState.value,
  }

  emits('toggle', toggleEvent)
}

function setActive(event?: MouseEvent) {
  if (autocollapse === true) {
    // Active item is set to indicate a single active item at once.
    setActiveItem(itemId.value)
  } else {
    // Open is used to indicate multiple active items.
    isOpen.value = !isOpen.value
  }
  onToggle(event)
}

watch(
  () => isOpen.value,
  (isOpenValue) => {
    if (isOpenValue && autocollapse) {
      setActive()
    }
  },
)

watch(
  () => isActive.value,
  (isActiveValue) => {
    // When isActive changes, all items need to be notified and checked if they are the active item, and if not closed.
    currentOpenState.value = autocollapse ? isActiveValue === itemId.value : isOpen.value
  },
)

if (autocollapse && isOpen.value) setActive()
</script>
<template>
  <div :class="mergedAccordionItemClasses">
    <div class="accordion-header">
      <button class="accordion-header-button" @click="setActive">
        <slot name="header"></slot><span class="header-control"></span>
      </button>
    </div>

    <div class="accordion-section" v-if="currentOpenState"><slot></slot></div>
  </div>
</template>
