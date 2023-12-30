<script lang="ts" setup>
import { ref } from 'vue'
import FolioleAccordion from 'foliole-vue/src/components/Accordion/FolioleAccordion.vue'
import FolioleAccordionItem from 'foliole-vue/src/components/Accordion/FolioleAccordionItem.vue'
import FolioleSlideToggle from 'foliole-vue/src/components/SlideToggle/FolioleSlideToggle.vue'
import FolioleDrawer from 'foliole-vue/src/components/Drawer/FolioleDrawer.vue'

const showDrawer = ref(false)

function handleDrawerClose() {
  showDrawer.value = false
}

function handleDrawerOpen() {
  showDrawer.value = true
}
</script>
<template>
  <div class="w-full">
    <FolioleDrawer :show="showDrawer" @close="handleDrawerClose">
      <div>Example Drawer.</div>
    </FolioleDrawer>
    <button @click="handleDrawerOpen">Open Drawer</button>
    <FolioleAccordion :autocollapse="true">
      <FolioleAccordionItem accordion-header-classes="accordion-header" :open="true">
        <template #header>Tab 1</template> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed
        gravida lacus at metus cursus, ac facilisis eros blandit. Phasellus feugiat massa non quam bibendum, sed
        vestibulum metus laoreet. Vivamus dapibus leo non justo vehicula, nec elementum lorem tincidunt.
      </FolioleAccordionItem>
      <FolioleAccordionItem accordion-header-classes="accordion-header">
        <template #header>Tab 2</template> Integer pharetra quam at arcu auctor, in tincidunt justo condimentum. Aliquam
        malesuada diam quis fermentum interdum. Duis feugiat odio eget ex ullamcorper, sit amet bibendum purus cursus.
        In hac habitasse platea dictumst. Donec tincidunt, nunc non vestibulum laoreet, lectus felis laoreet arcu, nec
        ultrices turpis mi nec metus.</FolioleAccordionItem
      >
      <FolioleAccordionItem accordion-header-classes="accordion-header">
        <template #header>Tab 3</template> Integer pharetra quam at arcu auctor, in tincidunt justo condimentum. Aliquam
        malesuada diam quis fermentum interdum. Duis feugiat odio eget ex ullamcorper, sit amet bibendum purus cursus.
        In hac habitasse platea dictumst. Donec tincidunt, nunc non vestibulum laoreet, lectus felis laoreet arcu, nec
        ultrices turpis mi nec metus.</FolioleAccordionItem
      >
    </FolioleAccordion>
    <FolioleSlideToggle label="slide toggle" />
  </div>
</template>
