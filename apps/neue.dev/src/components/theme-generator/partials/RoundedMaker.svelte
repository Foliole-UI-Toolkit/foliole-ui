<script lang="ts">
  import { getThemeOptionsStore } from '../data/stores'
  import { roundedOpts, elementRoundness } from '../data/settings'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const themeOptionsStore = getThemeOptionsStore() as any

  function handleInputChange(event: any) {
    const inputName = event?.target?.name
    const inputValue = event?.target?.value

    themeOptionsStore.updateRoundedOpts({ [inputName]: inputValue })
    dispatch('roundedInputChange')
  }
</script>

<!-- Add the select dropdown in your template -->
<div class="space-y-4">
  <label class="options-input-wrapper">
    <span>Theme Roundness:</span>
    <select class="w-full my-select" bind:value={roundedSize} on:change={(e) => emitBtnOptsChange(e, 'roundedOpts')}>
      {#each Object.entries(roundedOpts) as [key, value]}
        <option {value}>{key}</option>
      {/each}
    </select>
  </label>
  {#if $themeOptionsStore.roundedOpts.size !== '--border-radius-none'}
    <label class="options-input-wrapper">
      <span>Button Roundness:</span>
      <select
        class="w-full my-select"
        bind:value={buttonRoundLevel}
        on:change={(e) => emitBtnOptsChange(e, 'buttonRoundness')}
      >
        {#each Object.entries(elementRoundness) as [key, value]}
          <option {value}>{key}</option>
        {/each}
      </select>
    </label>
  {/if}
  {#if $themeOptionsStore.roundedOpts.size !== '--border-radius-none'}
    <label class="options-input-wrapper">
      <span>Input Roundness:</span>
      <select
        class="w-full my-select"
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
