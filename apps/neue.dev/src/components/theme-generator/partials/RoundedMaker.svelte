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
    <span>Rounded Theme Level:</span>
    <select
      class="my-select w-28"
      name="size"
      bind:value={$themeOptionsStore.roundedOpts.size}
      on:change={(e) => handleInputChange(e)}
    >
      {#each Object.entries(roundedOpts) as [key, value]}
        <option {value}>{key}</option>
      {/each}
    </select>
  </label>
  {#if $themeOptionsStore.roundedOpts.size !== '--border-radius-none'}
    <label class="options-input-wrapper">
      <span>Button Roundness:</span>
      <select
        class="w-28 my-select"
        name="btnRoundness"
        bind:value={$themeOptionsStore.roundedOpts.btnRoundness}
        on:change={(e) => handleInputChange(e)}
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
        class="w-28 my-select"
        name="inputRoundness"
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
