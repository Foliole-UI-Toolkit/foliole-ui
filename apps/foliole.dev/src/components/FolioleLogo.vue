<script setup lang="ts">
import { withDefaults } from 'vue'

export interface LogoProps {
  logoClasses?: string
  logoWrapperClasses?: string
  logoH1?: string
  logoTextUI?: string
}

withDefaults(defineProps<LogoProps>(), {
  logoClasses: 'foliole-logo foliole-logo-options foliole-logo-horizontal',
  logoWrapperClasses: 'foliole-logo-wrapper foliole-logo-wrapper-options',
  logoH1: 'foliole-logo-h1 foliole-logo-h1-horizontal',
  logoTextUI: 'foliole-logo-text-ui',
})
</script>

<template>
  <div :class="logoWrapperClasses">
    <span :class="logoClasses"> </span>
    <h1 :class="logoH1">
      <a href="/"><span class="">foliole </span><span :class="logoTextUI">UI</span></a>
    </h1>
  </div>
</template>

<style>
.foliole-logo {
  @apply flex self-center flex-shrink-0 border-[.125rem] rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg shadow-md bg-primary border-secondary;
}

.foliole-logo-options {
  background: linear-gradient(45deg, rgb(var(--color-primary-mlt) / 1), rgb(var(--color-secondary-mlt) / 1));
}

.foliole-logo-horizontal {
  @apply flex-row mr-1 w-5 h-5;
}

.foliole-logo-vertical {
  @apply flex-col mb-1 w-6 h-6;
}

.foliole-logo-wrapper {
  @apply flex;
}

.foliole-logo-wrapper-options {
  @apply flex-row;
}

.foliole-logo-h1 {
  @apply font-bold whitespace-nowrap uppercase;
}

.foliole-logo-h1-horizontal {
  @apply text-2xl;
}

.foliole-logo-h1-vertical {
  @apply text-4xl;
}

.foliole-logo-text-ui {
  background: linear-gradient(45deg, rgb(var(--color-primary) / 1), rgb(var(--color-secondary) / 1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
