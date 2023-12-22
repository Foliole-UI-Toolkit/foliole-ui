<script setup lang="ts">
import { ref } from 'vue'
import NeueAppRail from '@neue/neue-vue/src/components/AppRail/NeueAppRail.vue'
import NeueAppRailButton from '@neue/neue-vue/src/components/AppRail/NeueAppRailButton.vue'
const section = ref('docs')
</script>
<template>
  <div class="flex w-full h-screen">
    <NeueAppRail
      activeTokenClass="bg-primary/90 shadow-sm"
      client:visible
      appRailClasses="app-rail my-app-rail border-r-2 border-primary-light bg-neutral-light/10 shadow-md"
    >
      <NeueAppRailButton
        v-model="section"
        :selected="section === 'docs'"
        title="docs"
        value="docs"
        name="sections"
        railItemClasses="rail-item my-rail-item"
        client:load
      >
        <template #lead>
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </template>
        <template #label>Docs</template>
      </NeueAppRailButton>
      <NeueAppRailButton
        v-model="section"
        :selected="section === 'css'"
        title="css"
        value="css"
        name="sections"
        railItemClasses="rail-item my-rail-item"
        client:load
      >
        <template #lead>
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        </template>
        <template #label>CSS</template>
      </NeueAppRailButton>
      <NeueAppRailButton
        v-model="section"
        title="components"
        :selected="section === 'components'"
        value="components"
        name="sections"
        railItemClasses="rail-item my-rail-item"
        client:load
      >
        <template #lead>
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </template>
        <template #label>Comps</template>
      </NeueAppRailButton>
      <template #tail></template>
    </NeueAppRail>
    <div class="w-full px-4 pb-4 md:w-72 bg-neutral-light/10">
      <div v-if="section === 'docs'">
        <div class="space-y-4">
          <h3>Docs</h3>
          <ul class="space-y-4">
            <li>Intro</li>
            <li>Getting Started</li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3>Concepts</h3>
          <ul class="space-y-4">
            <li><a href="/docs/concepts/css-props-classes">CSS properties and classes</a></li>
            <li>Framework and CSS components</li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3>Resources</h3>
          <ul class="space-y-4">
            <li><a href="/docs/resources/roadmap">Roadmap</a></li>
            <li>Contributing</li>
          </ul>
        </div>
      </div>
      <div class="space-y-4" v-else-if="section === 'css'">
        <h3>CSS Elements</h3>
        <ul class="space-y-4">
          <li>Button</li>
        </ul>
      </div>
      <div v-else-if="section === 'components'">
        <div class="space-y-4">
          <h3>Examples</h3>
          <ul class="space-y-4">
            <li>Examples</li>
            <li>App Shell</li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3>Components</h3>
          <ul class="space-y-4">
            <li>App Shell</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h3 {
  @apply uppercase text-xl font-bold border-b-2 border-primary-light  pt-6 pb-1;
}
</style>
