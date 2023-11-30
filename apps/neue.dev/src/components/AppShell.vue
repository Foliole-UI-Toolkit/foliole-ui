<script setup lang="ts">
import NeueAppShell from '@neue/neue-vue/src/components/AppShell/NeueAppShell.vue'
</script>
<template>
  <NeueAppShell
    siteCentralWrapperClasses="site-central-wrapper mx-auto "
    siteHeaderClasses="my-header siteheader site-header-options"
    pageClasses="page"
  >
    <template #header>
      <div class="flex flex-wrap">
        <div class="w-full">
          <div class="container flex items-center justify-start mx-auto">
            <span class="self-center justify-center flex-shrink-0 inline-block w-8 h-8 rounded-full bg-gradient-to-br">
            </span>
            <h1 class="whitespace-nowrap">NEUE: A UI TOOLKIT</h1>
          </div>
        </div>
        <ul class="container flex justify-end w-full p-2 mx-auto space-x-4">
          <li>
            <a class="uppercase" href="/">home</a>
          </li>
          <!-- This theme generator is written in svelte! Inside of a Vue component due to Astro's features! -->
          <li>
            <a class="uppercase" href="/theme-generator">theme generator</a>
          </li>
        </ul>
      </div>
      <div class="h-[.2rem] header-bottom"></div>
    </template>
    <template #sidebar-left>
      <div class="p-4 sidebar">
        <h2 class="text-2xl font-bold">Sidebar Left</h2>
        <p class="text-lg">This is the left sidebar.</p>
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
    @apply shadow-lg;
  }
  .header-bottom {
    background-image: linear-gradient(
      to right,
      rgba(239, 73, 83, 0.95),
      rgba(239, 140, 76, 0.95),
      rgba(194, 239, 73, 0.95),
      rgba(239, 73, 83, 0.95)
    );
  }
  .sidebar {
    @apply border-r-2  border-neutral-base shadow-xl;
    /* background-image: linear-gradient(to bottom right, rgba(239, 73, 83, 0.1), rgba(239, 174, 73, 0.1)); */
  }

  /* With vanilla css we make out own class, pass in Neue classes and viola. We passed in 3 classes rather than props. */
  /* .my-header {
    margin: 0 auto;
    width: 100%;
    border-bottom: 2px solid #000;
    margin-bottom: 1rem;
  } */
}
</style>
