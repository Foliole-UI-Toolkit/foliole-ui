<script lang="ts">
  import { roundedOpts, elementRoundness } from '../data/settings'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function emitBtnOptsChange(event: Event, selectId: string) {
    const selectedValue = event?.target?.value

    if (selectId === 'roundedOpts') {
      roundedSize = selectedValue
      if (selectedValue === 'none') {
        buttonRoundLevel = 'none'
        inputRoundLevel = 'none'
      }
    } else if (selectId === 'buttonRoundness') {
      buttonRoundLevel = selectedValue
    } else if (selectId === 'inputRoundness') {
      inputRoundLevel = selectedValue
    }
    dispatch('roundedOptsChange', {
      roundedSize,
      buttonRoundLevel,
      inputRoundLevel,
    })
  }

  export let roundedSize = '--rounded-md'
  export let buttonRoundLevel = '--radius-full'
  export let inputRoundLevel = '--radius-full'
</script>

<!-- Add the select dropdown in your template -->
<div class="space-y-4">
  <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2">
    <span>Rounded Theme Level:</span>
    <select class="my-select w-28" bind:value={roundedSize} on:change={(e) => emitBtnOptsChange(e, 'roundedOpts')}>
      {#each Object.entries(roundedOpts) as [key, value]}
        <option {value}>{key}</option>
      {/each}
    </select>
  </label>
  {#if roundedSize !== 'none'}
    <label class="grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2">
      <span>Button Roundness:</span>
      <select
        class="w-28 my-select"
        bind:value={buttonRoundLevel}
        on:change={(e) => emitBtnOptsChange(e, 'buttonRoundness')}
      >
        {#each Object.entries(elementRoundness) as [key, value]}
          <option {value}>{key}</option>
        {/each}
      </select>
    </label>
  {/if}
  {#if roundedSize !== 'none'}
    <label class="grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2">
      <span>Input Roundness:</span>
      <select
        class="w-28 my-select"
        bind:value={inputRoundLevel}
        on:change={(e) => emitBtnOptsChange(e, 'inputRoundness')}
      >
        {#each Object.entries(elementRoundness) as [key, value]}
          <option {value}>{key}</option>
        {/each}
      </select>
    </label>
  {/if}
</div>

<style lang="postcss">
  /* Your CSS styles for rounded classes here */
</style>
