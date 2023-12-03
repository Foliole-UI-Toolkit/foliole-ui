<script lang="ts" setup>
import { withDefaults, computed, provide } from 'vue'

export interface AppRailProps {
  appRailClasses?: string
  activeTokenClass?: string
  regionLeadClasses?: string
  regionDefaultClasses?: string
  regionTrailClasses?: string
}

const props = withDefaults(defineProps<AppRailProps>(), {
  appRailClasses: 'app-rail app-rail-options bg-surface-base',
  activeTokenClass: 'bg-primary-base',
  regionLeadClasses: '',
  regionDefaultClasses: '',
  regionTrailClasses: '',
})

const activeClass = computed(() => `${props.activeTokenClass}`)

provide('active', activeClass)
</script>
<template>
  <div :class="appRailClasses">
    <div :class="regionLeadClasses"><slot name="lead" /></div>
    <div :class="regionDefaultClasses"><slot /></div>
    <div :class="regionTrailClasses"><slot name="trail" /></div>
  </div>
</template>
