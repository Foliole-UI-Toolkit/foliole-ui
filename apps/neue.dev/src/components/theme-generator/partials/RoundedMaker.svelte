<script lang="ts">
  import { roundedOpts, elementRoundness } from '../data/settings'
  import { createEventDispatcher } from 'svelte'

  export let roundedSize = '--border-radius-md'
  export let buttonRoundLevel = '--border-radius-full'
  export let inputRoundLevel = '--borer-radius-full'

  const dispatch = createEventDispatcher()

  function emitBtnOptsChange(event: Event, selectId: string) {
    const selectedValue = event?.target?.value

    if (selectId === 'roundedOpts') {
      roundedSize = selectedValue
      if (selectedValue === '--border-radius-none') {
        buttonRoundLevel = '--border-radius-none'
        inputRoundLevel = '--border-radius-none'
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
</script>

<!-- Add the select dropdown in your template -->
<div class="space-y-4">
  <label class="options-input-wrapper">
    <span>Rounded Theme Level:</span>
    <select class="my-select w-28" bind:value={roundedSize} on:change={(e) => emitBtnOptsChange(e, 'roundedOpts')}>
      {#each Object.entries(roundedOpts) as [key, value]}
        <option {value}>{key}</option>
      {/each}
    </select>
  </label>
  {#if roundedSize !== '--border-radius-none'}
    <label class="options-input-wrapper">
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
  {#if roundedSize !== '--border-radius-none'}
    <label class="options-input-wrapper">
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
