<script setup lang="ts">
import { withDefaults, ref } from 'vue'

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
      <div class="flex flex-wrap border-primary-light bg-neutral-mlt-10">
        <div class="w-full px-2 py-4">
          <div class="container flex items-center justify-start mx-auto">
            <span
              class="self-center justify-center flex-shrink-0 inline-block w-[40px] h-[40px] mr-2 rounded-full shadow-md logo"
            >
            </span>
            <h1 class="text-4xl font-bold whitespace-nowrap">
              <a href="/"><span class="text-primary">NEUE </span><span>UI</span></a>
            </h1>
            <ul class="container flex justify-end w-full p-2 pb-0 mx-auto space-x-4 font-bold">
              <li>
                <a class="uppercase" href="/">home</a>
              </li>
              <!-- This theme generator is written in svelte! Inside of a Vue component due to Astro's features! -->
              <li>
                <a class="uppercase" href="/examples">examples</a>
              </li>
              <li>
                <a class="uppercase" href="/theme-generator">theme generator</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h-2 border-t-2 header-bottom border-primary-mlt"></div>
    </template>
    <template #sidebar-left>
      <div v-if="pathname !== '/'" class="flex h-full">
        <NeueAppRail client:visible appRailClasses="app-rail my-app-rail">
          <NeueAppRailButton
            v-model="section"
            :selected="section === 'docs'"
            value="docs"
            name="sections"
            railItemClasses="rail-item rail-item-options"
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
            railItemClasses="rail-item rail-item-options"
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
            railItemClasses="rail-item rail-item-options"
            client:load
          >
            <template #lead>
              <span class="block w-full h-full bg-secondary-50"></span>
            </template>
            <template #label>Components</template>
          </NeueAppRailButton>
          <template #tail></template>
        </NeueAppRail>
        <div class="p-4">
          <h2 class="text-2xl font-bold">Sidebar Left</h2>
          <p class="text-lg">This is the left sidebar.</p>
          <p>{{ section }}</p>
        </div>
      </div>
    </template>
    <slot></slot>
  </NeueAppShell>
</template>
<style>
@tailwind components;

@layer components {
  /* // if we add  siteheader and site-header-options to the components layer in the TW plugin we can simply concat this into one single class, too*/
  .my-app-shell {
    @apply bg-page mx-auto;
    background-image: linear-gradient(
      to right,
      rgba(var(--color-primary), 0.1),
      rgba(var(--color-secondary), 0.1),
      rgba(var(--color-primary), 0.1)
    );
  }
  .my-header {
    @apply mx-auto w-full bg-page;
    @apply shadow-xl;
  }

  .header-bottom {
    background-image: linear-gradient(
      to right,
      rgba(var(--color-primary), 0.95),
      rgba(var(--color-secondary), 0.95),
      rgba(var(--color-tertiary), 0.95),
      rgba(var(--color-secondary), 0.95),
      rgba(var(--color-primary), 0.95)
    );
  }
  .logo {
    background-image: linear-gradient(
      to top right,
      rgba(var(--color-primary), 0.95),
      rgba(var(--color-secondary), 0.95)
    );
  }
  .my-side-bar-left {
    @apply shadow-sm border-r border-surface-raised;

    background-image: linear-gradient(
      to right,
      rgba(var(--color-primary), 0.05),
      rgba(var(--color-secondary), 0.05),
      rgba(var(--color-primary), 0.05)
    );
  }
  .my-app-rail {
    @apply border-r border-surface-raised w-[5.5rem];
  }
  .my-page {
    @apply relative z-0;
  }
  p {
    font-size: var(--scale-00);
  }
}
</style>
