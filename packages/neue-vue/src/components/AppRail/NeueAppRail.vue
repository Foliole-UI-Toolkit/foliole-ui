<script lang="ts" setup>
import { withDefaults, computed, provide } from 'vue'

export interface AppRailProps {
  appRailClasses?: string
  activeTokenClass?: string
  regionLeadClasses?: string
  regionDefaultClasses?: string
  regionTailClasses?: string
}

const props = withDefaults(defineProps<AppRailProps>(), {
  appRailClasses: 'app-rail app-rail-options',
  activeTokenClass: 'bg-primary',
  regionLeadClasses: '',
  regionDefaultClasses: '',
  regionTailClasses: '',
})

const activeClass = computed(() => `${props.activeTokenClass}`)

provide('active', activeClass)
</script>
<template>
  <div :class="appRailClasses">
    <div :class="regionLeadClasses"><slot name="lead" /></div>
    <div :class="regionDefaultClasses"><slot /></div>
    <div :class="regionTailClasses"><slot name="tail" /></div>
  </div>
</template>
