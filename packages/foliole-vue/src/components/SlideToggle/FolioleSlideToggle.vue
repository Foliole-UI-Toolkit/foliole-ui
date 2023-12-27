<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import classNames from 'classnames'

defineEmits(['click', 'keydown'])

interface SlideToggleProps {
  on?: boolean
  label: string
  text?: string
  slideToggleClasses?: string
  trackClasses?: string
  thumbClasses?: string
}

const props = withDefaults(defineProps<SlideToggleProps>(), {
  on: false,
  text: '',
  slideToggleClasses: 'slide-toggle slide-toggle-options',
  trackClasses: 'track track-small bg-neutral-mlt',
  thumbClasses: 'thumb bg-neutral',
})

const isOn = ref(props.on)

const onToggle = () => {
  isOn.value = !isOn.value
}

const onClass = computed(() => `${isOn.value ? 'on' : ''}`)

const mergedThumbClasses = computed(() => classNames([props.thumbClasses, onClass.value]))
</script>

<template>
  <div :class="slideToggleClasses" role="switch" data-testid="slide-toggle" tabindex="0" aria-label="{label}">
    <button :class="trackClasses" :aria-pressed="isOn" @click="onToggle" @keydown="$emit('keydown', $event)">
      <span aria-hidden="true" :class="mergedThumbClasses"></span>
    </button>
  </div>

  <p v-if="$slots['text']"><slot name="text" /></p>
</template>
