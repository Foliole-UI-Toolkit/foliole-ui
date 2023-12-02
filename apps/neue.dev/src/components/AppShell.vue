<script setup lang="ts">
import NeueAppShell from '@neue/neue-vue/src/components/AppShell/NeueAppShell.vue'
</script>
<template>
  <NeueAppShell
    siteCentralWrapperClasses="site-central-wrapper mx-auto "
    siteHeaderClasses="my-header siteheader site-header-options"
    pageClasses="page relative z-0"
    siteSidebarLeftClasses="sidebar-left site-sidebar-left-options shadow-sm border-r border-surface-netural-base bg-page-base-75 sidebar-left-custom"
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
              <a href="/"><span class="text-primary-base">NEUE </span><span>UI</span></a>
            </h1>
            <ul class="container flex justify-end w-full p-2 pb-0 mx-auto space-x-4 font-bold">
              <li>
                <a class="uppercase" href="/">home</a>
              </li>
              <!-- This theme generator is written in svelte! Inside of a Vue component due to Astro's features! -->
              <li>
                <a class="uppercase" href="/theme-generator">theme generator</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="h-4 border-t-2 header-bottom border-primary-mlt"></div>
    </template>
    <template #sidebar-left>
      <div class="sidebar">
        <div class="p-4">
          <h2 class="text-2xl font-bold">Sidebar Left</h2>
          <p class="text-lg">This is the left sidebar.</p>
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

  .my-header {
    @apply mx-auto w-full bg-page-base;
    @apply shadow-xl;
  }
  .header-bottom {
    background-image: linear-gradient(
      to right,
      rgba(var(--color-primary-base), 0.95),
      rgba(var(--color-secondary-base), 0.95),
      rgba(var(--color-tertiary-base), 0.95),
      rgba(var(--color-primary-base), 0.95)
    );
  }
  .logo {
    background-image: linear-gradient(
      to top right,
      rgba(var(--color-primary-base), 0.95),
      rgba(var(--color-secondary-base), 0.95)
    );
  }
  .sidebar-left-custom {
    background-image: linear-gradient(
      to right,
      rgba(var(--color-primary-base), 0.05),
      rgba(var(--color-secondary-base), 0.05),
      rgba(var(--color-primary-base), 0.05)
    );
  }
}
</style>
