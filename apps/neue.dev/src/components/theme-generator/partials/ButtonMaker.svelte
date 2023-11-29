<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { BtnFontSizes } from '$lib/types'

  const dispatch = createEventDispatcher()

  function emitBtnOptsChange() {
    dispatch('btnOptsChange', {
      btnPaddingBase,
      btnPaddingSizeScale,
      btnPaddingWidthScale,
      btnFontSizes,
    })
  }

  export let btnPaddingSizeScale: number = 20
  export let btnPaddingWidthScale: number = 3
  export let btnFontSizes: BtnFontSizes
  export let btnPaddingBase: number = 0.5

  // Create an array of font size options
  const fontSizeOptions: string[] = ['xs', 'sm', 'base', 'lg', 'xl']

  // Function to handle font size selection for a specific column
  function handleFontSizeSelect(event: Event, column: keyof BtnFontSizes) {
    btnFontSizes[column] = (event.target as HTMLSelectElement).value as keyof BtnFontSizes
    emitBtnOptsChange()
  }
</script>

<p class="mb-4 text-lg font-bold text-primary-base">Buttons</p>
<div class="grid grid-cols-3 gap-4 p-4">
  <button class="justify-self-center btn-neue btn-base btn-p-sm">Example</button>
  <button class="justify-self-center btn-neue btn-base btn-p-md">Example</button>
  <button class="justify-self-center btn-neue btn-base btn-p-lg">Example</button>
</div>

<div class="grid grid-cols-2 gap-4">
  <div class="p-4 border-4 rounded">
    <div class="space-y-4">
      <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2" for="sizeBase"
        >Size Base (.1-1):
        <input
          type="number"
          id="sizeBase"
          name="sizeBase"
          min=".1"
          max="1"
          step=".1"
          class="input-neue input-base"
          bind:value={btnPaddingBase}
          on:input={emitBtnOptsChange}
        />
      </label>
      <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2" for="sizeScaleIncrement"
        >Size Scale Increment (10-100%):
        <input
          type="number"
          id="sizeScaleIncrement"
          name="sizeScaleIncrement"
          min="10"
          max="100"
          step="10"
          class="input-neue input-base"
          bind:value={btnPaddingSizeScale}
          on:input={emitBtnOptsChange}
        />
      </label>
      <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2" for="sizeScaleIncrement"
        >Width Scale Increment (2-8x):
        <input
          type="number"
          id="sizeWidthIncrement"
          name="sizeWidthIncrement"
          min="2"
          max="8"
          step=".5"
          class="input-neue input-base"
          bind:value={btnPaddingWidthScale}
          on:input={emitBtnOptsChange}
        />
      </label>
    </div>
  </div>

  <div class="p-4 border-4 rounded">
    {#each ['sm', 'base', 'lg'] as column}
      <div class="">
        <p class="mt-2 text-center">{column}</p>
        <select
          class="select-neue select-base"
          bind:value={btnFontSizes[column]}
          on:change={(e) => handleFontSizeSelect(e, column)}
        >
          {#each fontSizeOptions as fontSize}
            <option value={fontSize}>{fontSize}</option>
          {/each}
        </select>
      </div>
    {/each}
  </div>
</div>
