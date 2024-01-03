<script lang="ts" setup>
import classNames from 'classnames'

import { type ComputedRef, computed, inject } from 'vue'

import { withDefaults } from 'vue'
defineEmits(['blur', 'click', 'focus', 'keydown', 'keypress', 'keyup', 'mouseleave', 'mouseover'])

export interface AppRailAnchorProps {
  selected?: boolean
  railTileWrapperClasses?: string
  railTileContentWrapperClasses?: string
  railItemClasses?: string
  railLabelClasses?: string
}

const props = withDefaults(defineProps<AppRailAnchorProps>(), {
  selected: false,
  railTileWrapperClasses: 'f0l_rail-tile-wrapper f0l_rail-tile-wrapper-opts',
  railTileContentWrapperClasses: 'f0l_rail-tile-content-wrapper',
  railItemClasses: 'f0l_rail-item f0l_rail-item-opts',
  railLabelClasses: 'f0l_rail-label',
})

const activeClass = inject<ComputedRef<string>>('active')

// Computed classes
const selectedActiveClass = computed(() => `${props.selected ? activeClass?.value : ''}`)

const mergedWrapperClasses = computed(() => classNames([props.railTileWrapperClasses, selectedActiveClass.value]))
</script>

<template>
  <a
    :class="mergedWrapperClasses"
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
    <div :class="railItemClasses">
      <div :class="railTileContentWrapperClasses">
        <slot name="lead"></slot>

        <span :class="railLabelClasses"><slot name="label"></slot></span>
      </div>
    </div>
  </a>
</template>
