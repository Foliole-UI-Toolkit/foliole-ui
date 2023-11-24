<!-- <script lang="ts" setup>
// Slots
/**
 * @slot lead - Appears above the default label, useful for icons.
 */

import { computed, inject, withDefaults, ref } from 'vue'
import { twMerge } from 'tailwind-merge'

const emits = defineEmits([
  'blur',
  'change',
  'click',
  'focus',
  'keydown',
  'keypress',
  'keyup',
  'mouseleave',
  'mouseover',
  'update:modelValue',
])
export interface AppRailAnchorProps {
  modelValue: string
  name: string
  title?: string
  value: string
  selected: boolean
  railItemsLabelClasses?: string
  railItemsWrapperClasses?: string
}

const props = withDefaults(defineProps<AppRailAnchorProps>(), {
  modelValue: '',
  name: '',
  title: '',
  value: '',
  selected: false,
  railItemsLabelClasses: 'rail-items-label-options',
  railItemsWrapperClasses: 'rail-items-wrapper rail-items-wrapper-options',
})

const activeClass = inject('active')

const modelValueRef = ref(props.modelValue)

// Computed classes
const selectedActiveClass = computed(() => `${props.selected ? activeClass.value : ''}`)

const mergedWrapperClasses = computed(() => twMerge([props.railItemsWrapperClasses, selectedActiveClass.value]))

function handleInput(e: Event) {
  modelValueRef.value = e?.target?.value
  emits('update:modelValue', modelValueRef.value)
}
</script>

<template>
  <label :class="mergedWrapperClasses" :title="title">
    <div :class="railItemsWrapperClasses">
      <div class="w-0 h-0 overflow-hidden">
        <input type="radio" :value="value" @input="handleInput" :checked="selected" />
      </div>
      <div>
        <div class="rail-anchor-items-lead">
          <slot name="lead"></slot>
        </div>
        <div :class="railItemsLabelClasses">
          <slot></slot>
        </div>
      </div>
    </div>
  </label>
</template> -->
