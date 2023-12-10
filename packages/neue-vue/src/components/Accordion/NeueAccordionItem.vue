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
  accordionClasses?: string
  accordionHeaderClasses: string
  headerControlClasses: string
  accordionSectionWrapper: string
  accordionSection: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  open: false,
  accordionClasses: 'accordion',
  accordionHeaderClasses: 'accordion-header',
  headerControlClasses: 'header-control',
  accordionSectionWrapper: 'accordion-section-wrapper',
  accordionSection: 'accordion-section',
})

const isOpen = ref<boolean>(props.open)
const currentOpenState = ref(isOpen.value)
const itemId = ref(String(Math.random()))

const openedItemClass = computed(() => currentOpenState.value && 'opened')

const mergedAccordionClasses = computed(() => classNames([props.accordionClasses, openedItemClass.value]))

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
  <div :class="mergedAccordionClasses">
    <button :class="accordionHeaderClasses" @click="setActive">
      <slot name="header"></slot><span class="header-control"></span>
    </button>

    <div :class="accordionSectionWrapper">
      <div :class="accordionSection"><slot></slot></div>
    </div>
  </div>
</template>
