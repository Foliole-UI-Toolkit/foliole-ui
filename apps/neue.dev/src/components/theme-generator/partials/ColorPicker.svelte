<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function emitColorChange() {
    dispatch('colorChange', colorHex)
  }

  export let colorHex: string = '#f00a0a'
</script>

<div class="flex w-2/3 p-1 bg-gray-100 rounded-md shadow-lg input">
  {#if colorHex.length}
    <input type="color" class="flex-none input" bind:value={colorHex} on:input={emitColorChange} />
    <input
      class="w-full p-1 mx-2 bg-transparent border-0 nested-input"
      type="text"
      bind:value={colorHex}
      on:input={emitColorChange}
    />
  {/if}
</div>
