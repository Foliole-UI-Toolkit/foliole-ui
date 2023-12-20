<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  flexDirection: {
    type: String as () => 'row' | 'col',
    default: 'row',
  },
  logoClasses: {
    type: String,
    default: 'neue-logo neue-logo-options w-6 h-6',
  },
  logoWrapperClasses: {
    type: String,
    default: 'neue-logo-wrapper neue-logo-wrapper-options',
  },
  logoH1: {
    type: String,
    default: 'neue-logo-h1',
  },
  logoTextUI: {
    type: String,
    default: 'neue-logo-text-ui',
  },
})
</script>

<template>
  <div :class="logoWrapperClasses">
    <span :class="logoClasses"> </span>
    <h1 :class="logoH1">
      <a href="/"><span class="">NEUE </span><span :class="logoTextUI">UI</span></a>
    </h1>
  </div>
</template>
