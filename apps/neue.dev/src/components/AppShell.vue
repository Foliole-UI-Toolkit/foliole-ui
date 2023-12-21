<script setup lang="ts">
import { withDefaults, ref } from 'vue'

import Logo from './Logo.vue'

import NeueAppShell from '@neue/neue-vue/src/components/AppShell/NeueAppShell.vue'
import NeueAppRail from '@neue/neue-vue/src/components/AppRail/NeueAppRail.vue'
import NeueAppRailButton from '../../../../packages/neue-vue/src/components/AppRail/NeueAppRailButton.vue'

const section = ref('docs')

export interface Props {
  pathname?: string
}

withDefaults(defineProps<Props>(), {
  pathname: '',
})
</script>
<template>
  <NeueAppShell
    appShellClasses="app-shell my-app-shell"
    siteCentralWrapperClasses="site-central-wrapper mx-auto"
    siteHeaderClasses="siteheader site-header-options my-header"
    pageClasses="page my-page"
    siteSidebarLeftClasses="sidebar-left site-sidebar-left-options my-side-bar-left"
  >
    <template #header>
      <div class="flex flex-wrap p-4 bg-neutral-mlt-10">
        <div class="w-full">
          <div class="flex items-center justify-start mx-auto">
            <Logo />
            <ul class="container flex justify-end w-full p-2 pb-0 mx-auto space-x-4 font-bold">
              <li>
                <a class="uppercase" href="/">home</a>
              </li>
              <!-- This theme generator is written in svelte! Inside of a Vue component due to Astro's features! -->
              <li>
                <a class="uppercase" href="/docs">docs</a>
              </li>
              <li>
                <a class="uppercase" href="/theme-generator">theme generator</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="header-bottom border-primary"></div>
    </template>
    <template #sidebar-left>
      <div v-if="pathname !== '/'" class="flex h-full">
        <NeueAppRail client:visible appRailClasses="app-rail my-app-rail">
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
            :selected="section === 'styles'"
            title="styles"
            value="styles"
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
        <div class="p-4 w-72">
          <h2 class="text-2xl font-bold">Sidebar Left</h2>
          <p class="text-lg">This is the left sidebar.</p>
          <p>{{ section }}</p>
        </div>
      </div>
    </template>

    <div :class="{ 'mx-auto': pathname === '/', 'lg:w-[calc(1200px-22.5rem)]': pathname !== '/' }" class="h-full">
      <slot></slot>
    </div>
  </NeueAppShell>
</template>
