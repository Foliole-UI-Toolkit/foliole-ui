<script lang="ts">
  import { inputSettings } from '../data/settings'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  // function handleStopChange(event: Event) {
  //   const target = event.target as HTMLSelectElement
  //   const details = { colorIndex: colorsIndex, stops: target?.value }
  //   dispatch('stopsChange', details)
  // }

  function handleTextColorChange(event: Event) {
    const target = event.target as HTMLSelectElement
    const details = { colorIndex: colorsIndex, color: target.value }
    dispatch('textColorChange', details)
  }
  // export let stops: string
  export let colorOn: string
  export let colorsIndex: number
</script>

<div class="flex order-2 gap-2 md:order-3">
  <!-- <label class="flex flex-col w-1/2 label">
    <span>Color Stops</span>
    <select class="my-select" on:change={handleStopChange} bind:value={stops}>
      {#each inputSettings.stops as s}<option value={s.value}>{s.label}</option>{/each}
    </select>
  </label> -->
  <label class="flex flex-col w-full label">
    <span>Text Color</span>
    <select class="my-select" on:change={handleTextColorChange} bind:value={colorOn}>
      {#each inputSettings.colorProps as c}<option value={c.value}>{c.label}</option>{/each}
    </select>
  </label>
</div>

<style lang="postcss">
</style>
