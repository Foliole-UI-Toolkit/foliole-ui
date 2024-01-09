<script lang="ts" setup>
import { useAccordionStore } from './store.ts'
import { computed, inject, ref, watch, withDefaults } from 'vue'
import classNames from 'classnames'

if (!useAccordionStore) {
  throw new Error('useAccordionStore is undefined')
}
const autocollapse = inject<boolean>('autocollapse')

const { isActive, setActiveItem } = useAccordionStore()!

const emit = defineEmits(['toggle'])

interface AccordionItemProps {
  isOpen?: boolean
  accordionClasses?: string
  accordionHeaderClasses?: string
  headerControlClasses?: string
  accordionSectionWrapper?: string
  accordionSection?: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  isOpen: false,
  accordionClasses: 'f0l_accordion',
  accordionHeaderClasses: 'f0l_accordion-header',
  headerControlClasses: 'f0l_header-control',
  accordionSectionWrapper: 'f0l_accordion-section-wrapper',
  accordionSection: 'f0l_accordion-section',
})

const isOpenRef = ref<boolean>(props.isOpen)
const currentOpenState = ref(isOpenRef.value)
const itemId = ref(String(Math.random()))

const openedItemClass = computed(() => currentOpenState.value && 'opened')

const mergedAccordionClasses = computed(() => classNames([props.accordionClasses, openedItemClass.value]))

function onToggle(event?: MouseEvent) {
  currentOpenState.value = autocollapse ? isActive(itemId.value).value : isOpenRef.value

  const toggleEvent = {
    event,
    id: `accordion-control-${itemId.value}`,
    open: currentOpenState.value,
  }

  emit('toggle', toggleEvent)
}

function setActive(event?: MouseEvent) {
  if (autocollapse === true) {
    // Active item is set to indicate a single active item at once.
    setActiveItem(itemId.value)
  } else {
    // Open is used to indicate multiple active items.
    isOpenRef.value = !isOpenRef.value
  }
  onToggle(event)
}

watch(
  () => isOpenRef.value,
  (isOpenRefValue) => {
    if (isOpenRefValue && autocollapse) {
      setActive()
    }
  },
)

watch(
  () => isActive(itemId.value).value,
  (isActiveValue) => {
    // When isActive changes, all items need to be notified and checked if they are the active item, and if not closed.
    currentOpenState.value = autocollapse ? isActiveValue : isOpenRef.value
  },
)

if (autocollapse && isOpenRef.value) setActive()
</script>
<template>
  <div :class="mergedAccordionClasses">
    <button :class="accordionHeaderClasses" @click="setActive">
      <slot name="header"></slot><span class="f0l_header-control"></span>
    </button>

    <div :class="accordionSectionWrapper">
      <div :class="accordionSection"><slot></slot></div>
    </div>
  </div>
</template>
