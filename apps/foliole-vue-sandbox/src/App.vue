<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import { ref } from 'vue'
import '@foliole/foliole-css/styles/index.css'

import FolioleAppShell from '@foliole/foliole-vue/src/components/AppShell/FolioleAppShell.vue'
// import FolioleAppRail from '@foliole/foliole-vue/src/components/AppRail/FolioleAppRail.vue'

// import FolioleAppRailAnchor from '@foliole/foliole-vue/src/components/AppRail/FolioleAppRailAnchor.vue'
// import FolioleAppRailTile from '@foliole/foliole-vue/src/components/AppRail/FolioleAppRailTile.vue'
// let currentTile = ref('1')
</script>

<template>
  <FolioleAppShell>
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
      <!-- <FolioleAppRail>
        <FolioleAppRailAnchor :selected="true" href="/example">Example</FolioleAppRailAnchor>
        <FolioleAppRailAnchor :selected="false" href="/">Home</FolioleAppRailAnchor>
        <FolioleAppRailTile
          v-model="currentTile"
          :name="'tile-1'"
          :value="'1'"
          :title="'tile-1'"
          :selected="currentTile === '1'"
        >
          <span>Tile 1</span>
        </FolioleAppRailTile>
        <FolioleAppRailTile
          v-model="currentTile"
          :name="'tile-2'"
          :value="'2'"
          :title="'tile-2'"
          :selected="currentTile === '2'"
        >
          <span>Tile 2</span>
        </FolioleAppRailTile>
      </FolioleAppRail> -->
    </template>

    <RouterView />
  </FolioleAppShell>
</template>

<style lang="postcss">
.example {
  background: var(--background-blue);
}
</style>
