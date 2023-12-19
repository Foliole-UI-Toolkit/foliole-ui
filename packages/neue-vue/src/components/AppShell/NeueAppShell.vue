<script setup lang="ts">
import { ref, withDefaults } from 'vue'

export interface AppShellProps {
  appShellClasses?: string
  siteHeaderClasses?: string
  siteCentralWrapperClasses?: string
  siteSidebarLeftClasses?: string
  siteSidebarRightClasses?: string
  pageClasses?: string
  pageHeaderClasses?: string
  pageMainClasses?: string
  pageFooterClasses?: string
  siteFooterClasses?: string
}

withDefaults(defineProps<AppShellProps>(), {
  appShellClasses: 'app-shell',
  siteHeaderClasses: 'site-header site-header-options',
  siteCentralWrapperClasses: 'site-central-wrapper',
  siteSidebarLeftClasses: 'site-sidebar-left site-sidebar-left-options',
  siteSidebarRightClasses: 'site-sidebar-right site-sidebar-right-options',
  pageClasses: 'page',
  pageHeaderClasses: 'page-header',
  pageMainClasses: 'page-main h-full',
  pageFooterClasses: 'page-footer',
  siteFooterClasses: 'site-footer',
})
const el = ref<HTMLElement | null>(null)
</script>
<template>
  <div :class="appShellClasses">
    <header v-if="$slots['header']" id="site-header" :class="siteHeaderClasses"><slot name="header" /></header>
    <div :class="siteCentralWrapperClasses">
      <aside v-if="$slots['sidebar-left']" id="site-sidebar-left" :class="siteSidebarLeftClasses">
        <slot name="sidebar-left" />
      </aside>
      <div id="page" ref="el" :class="pageClasses">
        <header v-if="$slots['page-header']" id="page-header" :class="pageHeaderClasses">
          <slot name="page-header" />
        </header>
        <main id="page-main" :class="pageMainClasses"><slot /></main>
        <footer v-if="$slots['page-footer']" id="page-footer" :class="pageFooterClasses">
          <slot name="page-footer" />
        </footer>
      </div>
      <aside v-if="$slots['sidebar-right']" id="site-sidebar-right" :class="siteSidebarLeftClasses">
        <slot name="sidebar-right" />
      </aside>
    </div>
    <footer v-if="$slots['footer']" id="site-footer" :class="siteFooterClasses">header</footer>
  </div>
</template>
