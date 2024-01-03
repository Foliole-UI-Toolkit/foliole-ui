<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue'
import classNames from 'classnames'

defineEmits(['click', 'keydown'])

interface SlideToggleProps {
  isToggleOn?: boolean
  label: string
  text?: string
  slideToggleClasses?: string
  trackClasses?: string
  thumbClasses?: string
}

const props = withDefaults(defineProps<SlideToggleProps>(), {
  isToggleOn: false,
  text: '',
  slideToggleClasses: 'f0l__slide-toggle f0l_slide-toggle-opts',
  trackClasses: 'f0l_track f0l_track-small bg-neutral-mlt',
  thumbClasses: 'f0l_thumb bg-neutral',
})

const isToggleOnRef = ref(props.isToggleOn)

const onToggle = () => {
  isToggleOnRef.value = !isToggleOnRef.value
}

const onClass = computed(() => `${isToggleOnRef.value ? 'f0l_is-toggle-on' : ''}`)

const mergedThumbClasses = computed(() => classNames([props.thumbClasses, onClass.value]))
</script>

<template>
  <div :class="slideToggleClasses" role="switch" data-testid="slide-toggle" tabindex="0" aria-label="{label}">
    <button :class="trackClasses" :aria-pressed="isToggleOnRef" @click="onToggle" @keydown="$emit('keydown', $event)">
      <span aria-hidden="true" :class="mergedThumbClasses"></span>
    </button>
  </div>

  <p v-if="$slots['text']"><slot name="text" /></p>
</template>
