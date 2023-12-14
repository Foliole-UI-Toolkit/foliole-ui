<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import { ref } from 'vue'
import './assets/pollen.css'
import '@neue/neue-css/styles/index.css'

import NeueAppShell from '@neue/neue-vue/src/components/AppShell/NeueAppShell.vue'
// import NeueAppRail from '@neue/neue-vue/src/components/AppRail/NeueAppRail.vue'

// import NeueAppRailAnchor from '@neue/neue-vue/src/components/AppRail/NeueAppRailAnchor.vue'
// import NeueAppRailTile from '@neue/neue-vue/src/components/AppRail/NeueAppRailTile.vue'
// let currentTile = ref('1')
</script>

<template>
  <NeueAppShell>
    <template #header>
      <div class="wrapper">
        <nav class="p-2 space-x-4">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/modal">Modal</RouterLink>
          <RouterLink to="/example">Example</RouterLink>
        </nav>
      </div>
    </template>
    <template #sidebar-left>
      <!-- <NeueAppRail>
        <NeueAppRailAnchor :selected="true" href="/example">Example</NeueAppRailAnchor>
        <NeueAppRailAnchor :selected="false" href="/">Home</NeueAppRailAnchor>
        <NeueAppRailTile
          v-model="currentTile"
          :name="'tile-1'"
          :value="'1'"
          :title="'tile-1'"
          :selected="currentTile === '1'"
        >
          <span>Tile 1</span>
        </NeueAppRailTile>
        <NeueAppRailTile
          v-model="currentTile"
          :name="'tile-2'"
          :value="'2'"
          :title="'tile-2'"
          :selected="currentTile === '2'"
        >
          <span>Tile 2</span>
        </NeueAppRailTile>
      </NeueAppRail> -->
    </template>

    <RouterView />
  </NeueAppShell>
</template>

<style lang="postcss">
.example {
  background: var(--background-blue);
}
</style>
