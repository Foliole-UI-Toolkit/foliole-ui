<script lang="ts">
  import { grayHues, singleSwatchColorClasses } from '../data/settings'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function emitSurfaceRelationshipsChange() {
    dispatch('surfaceRelationshipsChange', {
      selectedSurfaceLevel,
    })
  }

  function emitGrayHueChange() {
    dispatch('grayHueChange', {
      grayHue,
    })
  }

  export let selectedSurfaceLevel
  export let grayHue
</script>

<div
  class="flex flex-col items-center justify-center w-full p-4 border-neutral-mlt rounded {singleSwatchColorClasses[
    'page'
  ].base}"
>
  <span class="pb-2">Background color: ---color-page</span>
  <div class="text-center w-1/2 p-2 rounded {singleSwatchColorClasses['surface'].base}">
    Element background color : --color-surface
  </div>
</div>
<div
  class="flex flex-col items-center justify-center w-full p-4 border-neutral-mlt rounded {singleSwatchColorClasses[
    'surface'
  ].base}"
>
  <span class="pb-2">Background color: ---color-surface</span>
  <div class="text-center w-1/2 p-2 rounded {singleSwatchColorClasses['surface-raised'].base}">
    Element background color : --color-raised-surface
  </div>
</div>
<!-- {/each} -->

<div class="flex items-center space-x-2">
  <p>Surface and background relationships:</p>
  <label>
    <input
      class="input-radio-base"
      type="radio"
      bind:group={selectedSurfaceLevel}
      value="white"
      on:change={emitSurfaceRelationshipsChange}
    /> White
  </label>
  <label>
    <input
      class="input-radio-base"
      type="radio"
      bind:group={selectedSurfaceLevel}
      value="low"
      on:change={emitSurfaceRelationshipsChange}
    /> Low
  </label>
  <label>
    <input
      class="input-radio-base"
      type="radio"
      bind:group={selectedSurfaceLevel}
      value="high"
      on:change={emitSurfaceRelationshipsChange}
    /> High
  </label>
</div>
<div>
  <label class="space-x-2">
    <span>Gray Hue Percent:</span>
    <select class="w-20 my-select" bind:value={grayHue} on:change={emitGrayHueChange}>
      {#each grayHues as hue}
        <option value={hue}>{hue}</option>
      {/each}
    </select>
  </label>
</div>
