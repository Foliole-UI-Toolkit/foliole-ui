<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function emitBtnOptsChange() {
    dispatch('btnOptsChange', {
      btnPaddingBase,
      btnPaddingWidthScale,
      btnSizeScale,
    })
  }

  export let btnPaddingWidthScale: number = 3
  export let btnPaddingBase: number = 0.5
  export let btnSizeScale: number = 0.2

  // Create an array of font size options
  const fontSizeOptions: string[] = ['xs', 'sm', 'base', 'lg', 'xl']
</script>

<p class="pb-2 page-subheading">Buttons</p>
<div class="space-y-4">
  <div class="flex flex-col space-y-4">
    <button class="self-center justify-self-center btn-sm my-btn">Btn sm</button>
    <button class="self-center justify-self-center btn-md my-btn">Btn md</button>
    <button class="self-center justify-self-center btn-lg my-btn">Btn lg</button>
    <button class="self-center justify-self-center chip">Chip</button>
    <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2" for="sizeBase"
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

    <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2" for="sizeScaleIncrement"
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

    <label class=" grid grid-cols-1 items-center md:grid-cols-[200px_1fr] gap-2" for="sizeScale"
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
</div>
