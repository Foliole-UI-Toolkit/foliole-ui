<script lang="ts" setup>
import FolioleAccordion from 'foliole-vue/src/components/Accordion/FolioleAccordion.vue'
import FolioleAccordionItem from 'foliole-vue/src/components/Accordion/FolioleAccordionItem.vue'
import FolioleSlideToggle from 'foliole-vue/src/components/SlideToggle/FolioleSlideToggle.vue'
</script>
<template>
  <div class="inner-page-wrapper examples-vue">
    <FolioleAccordion :autocollapse="true">
      <FolioleAccordionItem :open="true">
        <template #header>Tab 1</template> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed
        gravida lacus at metus cursus, ac facilisis eros blandit. Phasellus feugiat massa non quam bibendum, sed
        vestibulum metus laoreet. Vivamus dapibus leo non justo vehicula, nec elementum lorem tincidunt.
      </FolioleAccordionItem>
      <FolioleAccordionItem>
        <template #header>Tab 2</template> Integer pharetra quam at arcu auctor, in tincidunt justo condimentum. Aliquam
        malesuada diam quis fermentum interdum. Duis feugiat odio eget ex ullamcorper, sit amet bibendum purus cursus.
        In hac habitasse platea dictumst. Donec tincidunt, nunc non vestibulum laoreet, lectus felis laoreet arcu, nec
        ultrices turpis mi nec metus.</FolioleAccordionItem
      >
      <FolioleAccordionItem>
        <template #header>Tab 3</template> Integer pharetra quam at arcu auctor, in tincidunt justo condimentum. Aliquam
        malesuada diam quis fermentum interdum. Duis feugiat odio eget ex ullamcorper, sit amet bibendum purus cursus.
        In hac habitasse platea dictumst. Donec tincidunt, nunc non vestibulum laoreet, lectus felis laoreet arcu, nec
        ultrices turpis mi nec metus.</FolioleAccordionItem
      >
    </FolioleAccordion>
    <FolioleSlideToggle label="slide toggle" />
  </div>
</template>
