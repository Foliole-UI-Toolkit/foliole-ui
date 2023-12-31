<script lang="ts">
  import { getThemeOptionsStore, type ThemeOptionsStore } from '../data/stores'
  import { roundedOpts, elementRoundness } from '../data/settings'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const themeOptionsStore = getThemeOptionsStore() as ThemeOptionsStore

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement
    const inputName = target?.name
    const inputValue = target?.value

    themeOptionsStore.updateRoundedOpts({ [inputName]: inputValue })
    dispatch('roundedInputChange')
  }
</script>

<!-- Add the select dropdown in your template -->
<div class="space-y-4">
  <label class="options-input-wrapper">
    <span>Theme Roundness:</span>
    <select
      class="w-full my-select"
      bind:value={$themeOptionsStore.roundedOpts.size}
      on:change={(e) => handleInputChange(e)}
    >
      {#each Object.entries(roundedOpts) as [key, value]}
        <option {value}>{key}</option>
      {/each}
    </select>
  </label>
  {#if $themeOptionsStore.roundedOpts.size !== '--ui-roundness-none'}
    <label class="options-input-wrapper">
      <span>Button Roundness:</span>
      <select
        class="w-full my-select"
        bind:value={$themeOptionsStore.roundedOpts.btnRoundness}
        on:change={(e) => handleInputChange(e)}
      >
        {#each Object.entries(elementRoundness) as [key, value]}
          <option {value}>{key}</option>
        {/each}
      </select>
    </label>
  {/if}
  {#if $themeOptionsStore.roundedOpts.size !== '--ui-roundness-none'}
    <label class="options-input-wrapper">
      <span>Input Roundness:</span>
      <select
        class="w-full my-select"
        bind:value={$themeOptionsStore.roundedOpts.inputRoundness}
        on:change={(e) => handleInputChange(e)}
      >
        {#each Object.entries(elementRoundness) as [key, value]}
          <option {value}>{key}</option>
        {/each}
      </select>
    </label>
  {/if}
</div>
