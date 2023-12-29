<script lang="ts">
  import type { FolioleColorNames } from '../types'
  import { steppedSwatchColorClasses } from '../data/settings'

  export let color: FolioleColorNames = 'primary'
  export let stops: string[]
</script>

<div class="flex order-3 md:order-2">
  {#each Object.entries(steppedSwatchColorClasses[color]).filter( ([shade]) => stops.includes(shade), ) as [shade, shadeClasses]}
    <div class="grid grid-rows-[1fr_40px] text-center w-full">
      <!-- Label -->
      <div class="text-sm" />
      <!-- Swatch -->

      <div class="h-full flex justify-center items-center {shadeClasses}">
        {#if shade === 'base'}
          <div>
            <span class="hidden sm:inline-block">Text</span>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
