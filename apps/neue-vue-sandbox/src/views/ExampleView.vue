<script lang="ts" setup>
import NeueAppRail from '@neue/neue-vue/src/components/AppRail/NeueAppRail.vue'
</script>
<template>
  <NeueAppRail />

  <label class="label">
    <span>Input</span>
    <input class="input" type="text" placeholder="Input" />
  </label>
  <label class="label">
    <span>Select</span>
    <select class="select select-pill">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4">Option 4</option>
      <option value="5">Option 5</option>
    </select>
  </label>
</template>
