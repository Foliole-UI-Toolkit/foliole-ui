<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function emitBtnOptsChange() {
    dispatch('btnOptsChange', {
      btnPaddingBase,
      btnPaddingWidthScale,
      btnSizeScale,
      btnHoverScale,
      btnActiveScale,
      btnHoverBrightness,
      btnActiveBrightness,
      btnFontSmSize,
      btnFontSize,
      btnFontLgSize,
    })
  }

  const fontSizeMap = {
    '12px': '--scale-000',
    '14px': '--scale-00',
    '16px': '--scale-0',
    '18px': '--scale-1',
    '20px': '--scale-2',
    '24px': '--scale-3',
  }

  export let btnPaddingWidthScale: number = 3
  export let btnPaddingBase: number = 0.5
  export let btnSizeScale: number = 0.2
  export let btnHoverScale: number | null = 0.98
  export let btnActiveScale: number | null = 1.05
  export let btnHoverBrightness: number | null = 95
  export let btnActiveBrightness: number | null = 102
  export let btnFontSmSize: string = '--scale-00'
  export let btnFontSize: string = '--scale-0'
  export let btnFontLgSize: string = '--scale-1'
</script>

<p class="pb-4 page-subheading">Buttons</p>
<div class="space-y-4">
  <div class="flex flex-col space-y-4">
    <button class="self-center justify-self-center btn-sm my-btn">Btn sm</button>
    <button class="self-center justify-self-center btn-md my-btn">Btn md</button>
    <button class="self-center justify-self-center btn-lg my-btn">Btn lg</button>
    <button class="self-center justify-self-center my-chip bg-neutral-light">Chip</button>
    <div class="p-4 space-y-4 border border-surface-raised-base">
      <p class="font-bold text-center">Base Options</p>
      <label class="options-input-wrapper" for="sizeBase"
        >Size Base (.1-1):
        <input
          type="number"
          id="sizeBase"
          name="sizeBase"
          min=".3"
          max="1"
          step=".1"
          class="my-input"
          bind:value={btnPaddingBase}
          on:input={emitBtnOptsChange}
        />
      </label>

      <label class="options-input-wrapper" for="sizeScaleIncrement"
        >Width Scale Increment (2-8x):
        <input
          type="number"
          id="sizeWidthIncrement"
          name="sizeWidthIncrement"
          min="2"
          max="8"
          step=".5"
          class="my-input"
          bind:value={btnPaddingWidthScale}
          on:input={emitBtnOptsChange}
        />
      </label>

      <label class="options-input-wrapper" for="sizeScale"
        >Size Scale (.1-.5):
        <input
          type="number"
          id="sizeScale"
          name="sizeScale"
          min=".1"
          max=".5"
          step=".1"
          class="my-input"
          bind:value={btnSizeScale}
          on:input={emitBtnOptsChange}
        />
      </label>
    </div>

    <!-- more options: will be hidden in a drawer when drawer is made -->
    <div class="p-4 space-y-4 border border-surface-raised-base">
      <p class="font-bold text-center">Interactive</p>
      <label class="options-input-wrapper" for="btnHoverScale">
        Hover Scale (0.8-1.2):
        <input
          type="number"
          id="btnHoverScale"
          name="btnHoverScale"
          min="0.8"
          max="1.2"
          step="0.01"
          class="my-input"
          bind:value={btnHoverScale}
          on:input={emitBtnOptsChange}
        />
      </label>

      <label class="options-input-wrapper" for="btnActiveScale">
        Active Scale (0.8-1.2):
        <input
          type="number"
          id="btnActiveScale"
          name="btnActiveScale"
          min="0.8"
          max="1.2"
          step="0.01"
          class="my-input"
          bind:value={btnActiveScale}
          on:input={emitBtnOptsChange}
        />
      </label>

      <label class="options-input-wrapper" for="btnHoverBrightness">
        Hover Brightness (0.8-1.2):
        <input
          type="number"
          id="btnHoverBrightness"
          name="btnHoverBrightness"
          min="80"
          max="120"
          step="1"
          class="my-input"
          bind:value={btnHoverBrightness}
          on:input={emitBtnOptsChange}
        />
      </label>

      <label class="options-input-wrapper" for="btnActiveBrightness">
        Active Brightness (0.8-1.2):
        <input
          type="number"
          id="btnActiveBrightness"
          name="btnActiveBrightness"
          min="88"
          max="120"
          step="1"
          class="my-input"
          bind:value={btnActiveBrightness}
          on:input={emitBtnOptsChange}
        />
      </label>
    </div>

    <!-- font sizes -->
    <div class="p-4 space-y-4 border border-surface-raised-base">
      <p class="font-bold text-center">Fonts</p>
      <label class="options-input-wrapper" for="btnFontSmSize">
        Font Size Small:
        <select id="btnFontSmSize" class="my-select" bind:value={btnFontSmSize} on:change={emitBtnOptsChange}>
          {#each Object.entries(fontSizeMap) as [size, value]}
            <option {value}>{size}</option>
          {/each}
        </select>
      </label>
      <label class="options-input-wrapper" for="btnFontSize">
        Font Size (12px - 24px):
        <select id="btnFontSize" class="my-select" bind:value={btnFontSize} on:change={emitBtnOptsChange}>
          {#each Object.entries(fontSizeMap) as [size, value]}
            <option {value}>{size}</option>
          {/each}
        </select>
      </label>
      <label class="options-input-wrapper" for="btnFontLgSize">
        Font Size (12px - 24px):
        <select id="btnFontLgSize" class="my-select" bind:value={btnFontLgSize} on:change={emitBtnOptsChange}>
          {#each Object.entries(fontSizeMap) as [size, value]}
            <option {value}>{size}</option>
          {/each}
        </select>
      </label>
    </div>
  </div>
</div>
