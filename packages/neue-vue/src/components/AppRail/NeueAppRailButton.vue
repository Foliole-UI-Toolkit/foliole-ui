<script lang="ts" setup>
import classNames from 'classnames'

import { type ComputedRef, computed, inject, ref, withDefaults } from 'vue'

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
  railItemWrapperClasses?: string
  railItemClasses?: string
  railLabelClasses?: string
}

const props = withDefaults(defineProps<AppRailAnchorProps>(), {
  modelValue: '',
  name: '',
  title: '',
  value: '',
  selected: false,
  railItemWrapperClasses: 'rail-item-wrapper rail-item-wrapper-options',
  railItemClasses: 'rail-item rail-item-options',
  railLabelClasses: 'rail-label',
})

const activeClass = inject<ComputedRef<string>>('active')

const modelValueRef = ref(props.modelValue)

// Computed classes
const selectedActiveClass = computed(() => `${props.selected ? activeClass?.value : ''}`)

const mergedWrapperClasses = computed(() => classNames([props.railItemWrapperClasses, selectedActiveClass.value]))

function handleInput(e: any) {
  modelValueRef.value = e?.target?.value
  emits('update:modelValue', modelValueRef.value)
}
</script>

<template>
  <label :class="mergedWrapperClasses" :title="title">
    <div class="app-rail-inner hidden-radio">
      <input
        type="radio"
        :value="value"
        :name="name"
        @change="(e) => handleInput(e)"
        @input="(e) => handleInput(e)"
        @click="(e) => handleInput(e)"
        :checked="selected"
      />
    </div>
    <div :class="railItemClasses">
      <div class="flex flex-col items-center justify-center h-full">
        <slot name="lead"></slot>

        <span :class="railLabelClasses"><slot name="label"></slot></span>
      </div>
    </div>
  </label>
</template>
