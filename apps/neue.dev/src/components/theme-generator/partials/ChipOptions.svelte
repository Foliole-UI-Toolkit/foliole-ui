<script lang="ts">
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  //
  import { additionalColorSchemes, neueColorSchemes } from '../data/settings'
  import type { ColorsCollection } from '../types'

  const colorSchemeStore = getContext('colorSchemeStore') as Writable<string>
  const colorsCollectionStore = getContext('colorsCollectionStore') as Writable<ColorsCollection>

  function toggleOptionalColors(colorKey: string): void {
    if ($colorsCollectionStore[colorKey] !== undefined) {
      delete $colorsCollectionStore[colorKey]
    } else {
      $colorsCollectionStore[colorKey] = null
    }
    colorsCollectionStore.set($colorsCollectionStore)
  }
  function chooseColorScheme(colorKey: string): void {
    $colorSchemeStore = colorKey
    $colorsCollectionStore['primary'] = null
    $colorsCollectionStore['secondary'] = null
    $colorsCollectionStore['tertiary'] = null
    $colorsCollectionStore['quaternary'] = null
    $colorsCollectionStore['quinary'] = null
  }
</script>

<div class="space-y-1">
  <p class="font-bold text-center">Choose color scheme: (only one currently)</p>
  <div class="flex flex-wrap justify-center gap-2">
    {#each neueColorSchemes as colorKey}
      <button
        class={`chip text-base ${
          $colorSchemeStore === colorKey ? 'variant-filled-secondary' : 'variant-ghost-secondary'
        }`}
        on:click={() => {
          chooseColorScheme(colorKey)
        }}
      >
        {colorKey}
      </button>
    {/each}
  </div>
</div>

<div class="space-y-1">
  <p class="font-bold text-center">Choose optional additional colors:</p>
  <div class="flex flex-wrap justify-center gap-2">
    {#each additionalColorSchemes as colorKey}
      <button
        class={`chip text-base ${
          $colorsCollectionStore[colorKey] || $colorsCollectionStore[colorKey] === null
            ? 'variant-filled-secondary'
            : 'variant-ghost-secondary'
        }`}
        on:click={() => {
          toggleOptionalColors(colorKey)
        }}
      >
        {colorKey}
      </button>
    {/each}
  </div>
  <p class="pt-2 font-bold text-center">All used colors:</p>
  <div class="flex flex-wrap justify-center gap-2">
    {#each Object.keys($colorsCollectionStore) as key}
      <span class="text-base chip chip-static bg-surface-mlt">{key}</span>
    {/each}
  </div>
</div>

<style lang="postcss">
  .chip {
    @apply p-3;
  }
  .chip-static {
    @apply p-2;
    cursor: default;
  }
  .chip-static:hover {
    --tw-brightness: brightness(1);
  }
</style>
