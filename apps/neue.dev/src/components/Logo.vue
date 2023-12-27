<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  flexDirection: {
    type: String as () => 'row' | 'col',
    default: 'row',
  },
  logoClasses: {
    type: String,
    default: 'neue-logo neue-logo-options neue-logo-horizontal',
  },
  logoWrapperClasses: {
    type: String,
    default: 'neue-logo-wrapper neue-logo-wrapper-options',
  },
  logoH1: {
    type: String,
    default: 'neue-logo-h1 neue-logo-h1-horizontal',
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

<style>
.neue-logo {
  @apply flex self-center flex-shrink-0 border-[.125rem] rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg shadow-md bg-primary border-secondary;
}

.neue-logo-options {
  background: linear-gradient(45deg, rgb(var(--color-primary) / 1), rgb(var(--color-secondary) / 1));
}

.neue-logo-horizontal {
  @apply flex-row mr-1 w-5 h-5;
}

.neue-logo-vertical {
  @apply flex-col mb-1 w-6 h-6;
}

.neue-logo-wrapper {
  @apply flex;
}

.neue-logo-wrapper-options {
  @apply flex-row;
}

.neue-logo-h1 {
  @apply font-bold whitespace-nowrap;
}

.neue-logo-h1-horizontal {
  @apply text-2xl;
}

.neue-logo-h1-vertical {
  @apply text-4xl;
}

.neue-logo-text-ui {
  background: linear-gradient(45deg, rgb(var(--color-primary) / 1), rgb(var(--color-secondary) / 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
