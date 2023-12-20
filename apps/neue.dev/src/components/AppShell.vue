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
            value="docs"
            name="sections"
            railItemClasses="rail-item my-rail-item"
            client:load
          >
            <template #lead>
              <span class="block w-full h-full bg-secondary-50"></span>
            </template>
            <template #label>Docs</template>
          </NeueAppRailButton>
          <NeueAppRailButton
            v-model="section"
            :selected="section === 'styles'"
            value="styles"
            name="sections"
            railItemClasses="rail-item my-rail-item"
            client:load
          >
            <template #lead>
              <span class="block w-full h-full bg-secondary-50"></span>
            </template>
            <template #label>Styles</template>
          </NeueAppRailButton>
          <NeueAppRailButton
            v-model="section"
            :selected="section === 'components'"
            value="components"
            name="sections"
            railItemClasses="rail-item my-rail-item"
            client:load
          >
            <template #lead>
              <span class="block w-full h-full bg-secondary-50"></span>
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
