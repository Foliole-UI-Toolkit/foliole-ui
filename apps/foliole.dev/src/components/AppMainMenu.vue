<script setup lang="ts">
import { ref } from 'vue'
import FolioleAppRail from '../../../../packages/foliole-vue/src/components/AppRail/FolioleAppRail.vue'
import FolioleAppRailButton from '../../../../packages/foliole-vue/src/components/AppRail/FolioleAppRailButton.vue'
const section = ref('docs')

export interface Props {
  pathname?: string
}

withDefaults(defineProps<Props>(), {
  pathname: '',
})
</script>
<template>
  <div class="flex w-full h-screen">
    <FolioleAppRail
      active-token-class="shadow-sm bg-primary/90"
      app-rail-classes="app-rail my-app-rail border-r-[.125rem] border-tertiary-mlt/30 bg-neutral-light/10 shadow-md"
    >
      <FolioleAppRailButton
        v-model="section"
        :selected="section === 'docs'"
        title="docs"
        value="docs"
        name="sections"
        rail-item-classes="rail-item my-rail-item"
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
      </FolioleAppRailButton>
      <FolioleAppRailButton
        v-model="section"
        :selected="section === 'css'"
        title="css"
        value="css"
        name="sections"
        rail-item-classes="rail-item my-rail-item"
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
      </FolioleAppRailButton>
      <FolioleAppRailButton
        v-model="section"
        title="components"
        :selected="section === 'components'"
        value="components"
        name="sections"
        rail-item-classes="rail-item my-rail-item"
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
      </FolioleAppRailButton>
      <template #tail></template>
    </FolioleAppRail>
    <div class="w-full px-4 pb-4 md:w-72 bg-neutral-light/10">
      <div v-if="section === 'docs'">
        <div class="space-y-4">
          <h3>Docs</h3>
          <ul class="space-y-4">
            <li :class="{ 'my-hoverable': true, 'my-active': pathname === '/docs/intro' }">
              <a href="/docs/intro">Intro</a>
            </li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3>Concepts</h3>
          <ul class="space-y-4">
            <li :class="{ 'my-hoverable': true, 'my-active': pathname === '/docs/concepts/css-props-classes' }">
              <a href="/docs/concepts/css-props-classes">CSS properties and classes</a>
            </li>
          </ul>
        </div>
        <div class="space-y-4">
          <h3>Resources</h3>
          <ul class="space-y-4">
            <li
              :class="{ 'my-hoverable': true, 'my-active': pathname === '/docs/resources/roadmap' }"
              href="/docs/resources/roadmap"
            >
              <a href="/docs/resources/roadmap">Roadmap</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="section === 'css'" class="space-y-4">
        <h3>CSS Elements</h3>
        <ul class="space-y-4">
          <li :class="{ 'my-hoverable': true, 'my-active': pathname === '/css/button' }" href="/css/button">
            <a href="/css/button">Button</a>
          </li>
        </ul>
      </div>
      <div v-else-if="section === 'components'">
        <div class="space-y-4">
          <h3>Examples</h3>
          <ul class="space-y-4">
            <li :class="{ 'my-hoverable': true, 'my-active': pathname === '/examples' }" href="/examples">
              <a href="/examples">Examples</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h3 {
  @apply uppercase text-xl font-bold border-b-[.125rem] border-tertiary-mlt/30  pt-6 pb-1;
}
</style>
