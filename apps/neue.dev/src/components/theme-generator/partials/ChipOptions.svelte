<script lang="ts">
  // Local
  import { updateColorsColl } from '../helpers'
  import { additionalColorSchemes, neueColorSchemes } from '../data/settings'
  import type { ColorsCollection } from '../types'
  // Svelte related
  import { createEventDispatcher, getContext } from 'svelte'
  import { type Writable } from 'svelte/store'

  const colorSchemeStore = getContext('colorSchemeStore') as Writable<string>
  const colorsCollectionStore = getContext('colorsCollectionStore') as Writable<ColorsCollection>
  const hex = getContext('primaryColorHex') as string
  const additionalColorsStore = getContext('additionalColorsStore') as Writable<string[]>

  const dispatch = createEventDispatcher()

  function emitColorAdditionChange() {
    dispatch('colorAdditionChange', {
      colorAdditionChange: true,
    })
  }

  function emitColorSchemeChange() {
    dispatch('colorSchemeChange', {
      colorSchemeChange: true,
    })
  }

  function toggleOptionalColors(colorKey: string): void {
    if ($colorsCollectionStore[colorKey] !== undefined) {
      delete $colorsCollectionStore[colorKey]
      additionalColorsStore.update((colors) => {
        return { ...colors, [colorKey]: false }
      })
    } else {
      updateColorsColl(colorsCollectionStore, colorKey, hex)
      additionalColorsStore.update((colors) => {
        return { ...colors, [colorKey]: hex }
      })
    }
    emitColorAdditionChange()
  }

  function chooseColorScheme(colorKey: string): void {
    $colorSchemeStore = colorKey
    emitColorSchemeChange()
  }
</script>

<div class="space-y-1">
  <p class="font-bold text-center">Choose color scheme:</p>
  <div class="flex flex-wrap justify-center gap-2">
    {#each neueColorSchemes as colorKey}
      <button
        class={`my-chip text-base ${$colorSchemeStore === colorKey ? 'bg-primary' : 'bg-neutral-light'}`}
        on:click={() => {
          chooseColorScheme(colorKey)
        }}
      >
        {colorKey}
      </button>
    {/each}
  </div>
</div>

<!-- <div class="space-y-1">
  <p class="font-bold text-center">Choose optional additional colors:</p>
  <div class="flex flex-wrap justify-center gap-2">
    {#each additionalColorSchemes as colorKey}
      <button
        class={`my-chip text-base ${
          $colorsCollectionStore[colorKey] || $colorsCollectionStore[colorKey] === null
            ? 'bg-primary'
            : 'bg-neutral-light'
        }`}
        on:click={() => {
          toggleOptionalColors(colorKey)
        }}
      >
        {colorKey}
      </button>
    {/each}
  </div>
</div> -->
