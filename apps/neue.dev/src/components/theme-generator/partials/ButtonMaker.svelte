<script lang="ts">
  import { getThemeOptionsStore } from '../data/stores'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const themeOptionsStore = getThemeOptionsStore() as any

  function handleInputChange(event: any) {
    const inputName = event?.target?.name
    const inputValue = event?.target?.value

    themeOptionsStore.updateBtnOpts({ [inputName]: parseFloat(inputValue) })

    dispatch('btnInputChange')
  }

  const fontSizeMap = {
    '12px': '--font-scale-xs',
    '14px': '--font-scale-sm',
    '16px': '--font-scale-base',
    '18px': '--font-scale-lg',
    '20px': '--font-scale-xl',
  }
</script>

<p class="pb-4 page-subheading">Buttons</p>
<div class="space-y-4">
  <div class="flex flex-col space-y-4">
    <button class="self-center justify-self-center btn-sm my-btn">Btn sm</button>
    <button class="self-center justify-self-center btn-md my-btn">Btn md</button>
    <button class="self-center justify-self-center btn-lg my-btn">Btn lg</button>
    <button class="self-center justify-self-center my-chip bg-neutral-light">Chip</button>
    <div class="p-4 space-y-4 border border-surface-raised">
      <p class="font-bold text-center">Base Options</p>
      <label class="options-input-wrapper" for="paddingBase"
        >Size Base (.1-1):
        <input
          type="number"
          id="paddingBase"
          name="paddingBase"
          min=".375"
          max="1"
          step=".125"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.paddingBase}
          on:input={handleInputChange}
        />
      </label>

      <label class="options-input-wrapper" for="paddingWidthScale"
        >Width Scale Increment (2-8x):
        <input
          type="number"
          id="paddingWidthScale"
          name="paddingWidthScale"
          min="2"
          max="8"
          step=".25"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.paddingWidthScale}
          on:input={handleInputChange}
        />
      </label>

      <label class="options-input-wrapper" for="sizeScale"
        >Size Scale (.1-.5):
        <input
          type="number"
          id="sizeScale"
          name="sizeScale"
          min="1"
          max="2"
          step=".125"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.sizeScale}
          on:input={handleInputChange}
        />
      </label>
    </div>

    <!-- more options: will be hidden in a drawer when drawer is made -->
    <div class="p-4 space-y-4 border border-surface-raised">
      <p class="font-bold text-center">Interactive</p>
      <label class="options-input-wrapper" for="hoverScale">
        Hover Scale (0.8-1.2):
        <input
          type="number"
          id="hoverScale"
          name="hoverScale"
          min="0.8"
          max="1.2"
          step="0.01"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.hoverScale}
          on:input={handleInputChange}
        />
      </label>

      <label class="options-input-wrapper" for="activeScale">
        Active Scale (0.8-1.2):
        <input
          type="number"
          id="activeScale"
          name="activeScale"
          min="0.8"
          max="1.2"
          step="0.01"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.activeScale}
          on:input={handleInputChange}
        />
      </label>

      <label class="options-input-wrapper" for="hoverBrightnessScale">
        Hover Brightness (0.8-1.2):
        <input
          type="number"
          id="hoverBrightnessScale"
          name="hoverBrightnessScale"
          min="80"
          max="120"
          step="1"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.hoverBrightnessScale}
          on:input={handleInputChange}
        />
      </label>

      <label class="options-input-wrapper" for="activeBrightnessScale">
        Active Brightness (0.8-1.2):
        <input
          type="number"
          id="activeBrightnessScale"
          name="activeBrightnessScale"
          min="88"
          max="120"
          step="1"
          class="my-input"
          bind:value={$themeOptionsStore.btnOpts.activeBrightnessScale}
          on:input={handleInputChange}
        />
      </label>
    </div>

    <!-- font sizes -->
    <div class="p-4 space-y-4 border border-surface-raised">
      <p class="font-bold text-center">Fonts</p>
      <label class="options-input-wrapper" for="fontSizeSm">
        Font Size Small:
        <select
          id="fontSizeSm"
          name="fontSizeSm"
          class="my-select"
          bind:value={$themeOptionsStore.btnOpts.fontSizeSm}
          on:change={handleInputChange}
        >
          {#each Object.entries(fontSizeMap) as [size, value]}
            <option {value}>{size}</option>
          {/each}
        </select>
      </label>
      <label class="options-input-wrapper" for="fontSize">
        Font Size (12px - 24px):
        <select
          id="fontSize"
          name="fontSize"
          class="my-select"
          bind:value={$themeOptionsStore.btnOpts.fontSize}
          on:change={handleInputChange}
        >
          {#each Object.entries(fontSizeMap) as [size, value]}
            <option {value}>{size}</option>
          {/each}
        </select>
      </label>
      <label class="options-input-wrapper" for="fontSizeLg">
        Font Size (12px - 24px):
        <select
          id="fontSizeLg"
          name="fontSizeLg"
          class="my-select"
          bind:value={$themeOptionsStore.btnOpts.fontSizeLg}
          on:change={handleInputChange}
        >
          {#each Object.entries(fontSizeMap) as [size, value]}
            <option {value}>{size}</option>
          {/each}
        </select>
      </label>
    </div>
  </div>
</div>
