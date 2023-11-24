<!-- <script lang="ts" setup>
import { twMerge } from 'tailwind-merge'
import { withDefaults, computed, useAttrs, inject } from 'vue'
defineEmits(['click', 'keydown', 'keyup', 'keypress', 'mouseover', 'mouseleave', 'focus', 'blur'])

export interface AppRailAnchorProps {
  selected: boolean
  railItemsLabelClasses?: string
  railItemsWrapperClasses?: string
}

const props = withDefaults(defineProps<AppRailAnchorProps>(), {
  selected: false,
  railItemsLabelClasses: 'rail-items-label-options',
  railItemsWrapperClasses: 'rail-items-wrapper rail-items-wrapper-options',
})

const attrs = useAttrs()

// Framework reactivity dependent code
const activeClass = inject('active')
const selectedActiveClass = computed(() => `${props.selected ? activeClass.value : ''}`)
const mergedWrapperClasses = computed(() => twMerge([props.railItemsWrapperClasses, selectedActiveClass.value]))
</script>

<template>
  <a
    class="rail-anchor-items"
    v-bind="attrs"
    data-testid="app-rail-anchor"
    @click="$emit('click'), $event"
    @keydown="$emit('keydown', $event)"
    @keyup="$emit('keyup', $event)"
    @keypress="$emit('keypress', $event)"
    @mouseover="$emit('mouseover'), $event"
    @mouseleave="$emit('mouseleave'), $event"
    @focus="$emit('focus'), $event"
    @blur="$emit('blur'), $event"
  >
    <div :class="mergedWrapperClasses">
      <div v-if="$slots.lead" class="rail-anchor-items-lead">
        <slot name="lead"></slot>
      </div>
      <div :class="railItemsLabelClasses"><slot></slot></div>
    </div>
  </a>
</template> -->
