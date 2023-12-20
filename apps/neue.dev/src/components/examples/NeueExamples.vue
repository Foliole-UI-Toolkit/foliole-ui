<script lang="ts" setup>
import NeueAccordion from '@neue/neue-vue/src/components/Accordion/NeueAccordion.vue'
import NeueAccordionItem from '@neue/neue-vue/src/components/Accordion/NeueAccordionItem.vue'
import SlideToggle from '@neue/neue-vue/src/components/SlideToggle/SlideToggle.vue'
</script>
<template>
  <div class="w-full">
    <NeueAccordion :autocollapse="true">
      <NeueAccordionItem accordionHeaderClasses="accordion-header" :open="true">
        <template #header>Tab 1</template> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed
        gravida lacus at metus cursus, ac facilisis eros blandit. Phasellus feugiat massa non quam bibendum, sed
        vestibulum metus laoreet. Vivamus dapibus leo non justo vehicula, nec elementum lorem tincidunt.
      </NeueAccordionItem>
      <NeueAccordionItem accordionHeaderClasses="accordion-header">
        <template #header>Tab 2</template> Integer pharetra quam at arcu auctor, in tincidunt justo condimentum. Aliquam
        malesuada diam quis fermentum interdum. Duis feugiat odio eget ex ullamcorper, sit amet bibendum purus cursus.
        In hac habitasse platea dictumst. Donec tincidunt, nunc non vestibulum laoreet, lectus felis laoreet arcu, nec
        ultrices turpis mi nec metus.</NeueAccordionItem
      >
      <NeueAccordionItem accordionHeaderClasses="accordion-header">
        <template #header>Tab 3</template> Integer pharetra quam at arcu auctor, in tincidunt justo condimentum. Aliquam
        malesuada diam quis fermentum interdum. Duis feugiat odio eget ex ullamcorper, sit amet bibendum purus cursus.
        In hac habitasse platea dictumst. Donec tincidunt, nunc non vestibulum laoreet, lectus felis laoreet arcu, nec
        ultrices turpis mi nec metus.</NeueAccordionItem
      >
    </NeueAccordion>
    <SlideToggle label="slide toggle" />
  </div>
</template>
