<script setup lang="ts">
import { ref } from 'vue'

import NeueAppRail from '@neue/neue-vue/src/components/AppRail/NeueAppRail.vue'
import NeueAppRailAnchor from '@neue/neue-vue/src/components/AppRail/NeueAppRailAnchor.vue'
import NeueAppRailTile from '@neue/neue-vue/src/components/AppRail/NeueAppRailTile.vue'

let currentTile = ref('1')
</script>

<template>
  <main class="grid h-screen grid-cols-[100px_1fr]">
    <div class="test">
      <h1 class="text-4xl font-bold text-primary-base">Neue Vue: Sandbox</h1>
      <div class="first-line:">
        <section v-if="currentTile === '1'">first section</section>
        <section v-else-if="currentTile === '2'">second section</section>
      </div>
    </div>
  </main>
</template>
