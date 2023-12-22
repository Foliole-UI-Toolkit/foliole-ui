<script setup lang="ts">
import { ref } from 'vue'

import AppMainMenu from './AppMainMenu.vue'
import Logo from './Logo.vue'

import NeueAppShell from '@neue/neue-vue/src/components/AppShell/NeueAppShell.vue'

import AppDrawer from './AppDrawer.vue'

const fullWidthPages: Record<string, boolean> = {
  '/': true,
  '/theme-generator': true,
}

export interface Props {
  pathname?: string
}

withDefaults(defineProps<Props>(), {
  pathname: '',
})

const showDrawer = ref(false)

function handleDrawerClose() {
  showDrawer.value = false
}

function handleDrawerOpen() {
  showDrawer.value = true
}
</script>
<template>
  <div v-if="!fullWidthPages[pathname]" class="flex h-full">
    {{ fullWidthPages[pathname] }}
    <!-- Consider performance implications of this and if other solutions are better in as menu grows. v-if, v-show and dynamic components -->
    <AppDrawer class="flex md:hidden" @close="handleDrawerClose" :show="showDrawer">
      <AppMainMenu />
    </AppDrawer>
  </div>
  <NeueAppShell
    appShellClasses="app-shell my-app-shell"
    siteCentralWrapperClasses="site-central-wrapper mx-auto"
    siteHeaderClasses="siteheader site-header-options my-header"
    pageClasses="page my-page h-screen"
    siteSidebarLeftClasses="sidebar-left site-sidebar-left-options my-side-bar-left"
  >
    <template #header>
      <div class="flex flex-wrap p-4">
        <div class="w-full">
          <div class="flex items-center justify-start mx-auto">
            <button class="inline-block pr-4 md:hidden" @click="handleDrawerOpen">
              <svg
                class="w-8 h-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <Logo />
            <ul class="container flex justify-end w-full p-2 pb-0 mx-auto space-x-4 font-bold">
              <li>
                <a class="uppercase" href="/">home</a>
              </li>
              <!-- This theme generator is written in svelte! Inside of a Vue component due to Astro's features! -->
              <li>
                <a class="uppercase" href="/docs/intro">docs</a>
              </li>
              <li>
                <a class="uppercase" href="/theme-generator">theme gen</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="header-bottom"></div>
    </template>
    <template #sidebar-left>
      <div v-if="!fullWidthPages[pathname]" class="flex">
        <div class="hidden md:flex">
          <AppMainMenu />
        </div>
      </div>
    </template>

    <div
      :class="{
        'mx-auto max-w-screen-lg w-full': fullWidthPages[pathname],
        'lg:w-[calc(1280px-22.5rem)]': !fullWidthPages[pathname],
      }"
      class="h-full"
    >
      <slot></slot>
    </div>
  </NeueAppShell>
</template>
