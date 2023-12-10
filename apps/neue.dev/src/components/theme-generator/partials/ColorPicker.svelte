<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function emitColorChange() {
    dispatch('colorChange', colorHex)
  }

  export let colorHex: string = '#f00a0a'
</script>

<div class="flex w-2/3 p-1 shadow-lg border border-surface !bg-page my-input input-wrapper">
  {#if colorHex.length}
    <input type="color" class="flex-none input-color-base" bind:value={colorHex} on:input={emitColorChange} />
    <input
      class="w-full p-1 mx-2 bg-transparent border-0 nested-input"
      type="text"
      bind:value={colorHex}
      on:input={emitColorChange}
    />
  {/if}
</div>

<style>
</style>
