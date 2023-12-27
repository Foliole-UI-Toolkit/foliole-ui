<script lang="ts">
  // Local
  // import { updateColorsColl } from '../helpers'
  import { folioleColorSchemes } from '../data/settings'
  import type { ColorsCollection } from '../types'
  // Svelte related
  import { createEventDispatcher, getContext } from 'svelte'
  import { type Writable } from 'svelte/store'

  const colorSchemeStore = getContext('colorSchemeStore') as Writable<string>
  const colorsCollectionStore = getContext('colorsCollectionStore') as Writable<ColorsCollection>
  const hex = getContext('primaryColorHex') as string

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

  function chooseColorScheme(colorKey: string): void {
    $colorSchemeStore = colorKey
    emitColorSchemeChange()
  }
</script>

<div class="space-y-1">
  <p class="font-bold text-center">Choose color scheme:</p>
  <div class="flex flex-wrap justify-center gap-2">
    {#each folioleColorSchemes as colorKey}
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
