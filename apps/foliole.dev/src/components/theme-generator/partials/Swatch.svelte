<script lang="ts">
  import type { FolioleColorNames } from '../types'
  import { steppedSwatchColorClasses } from '../data/settings'

  export let color: FolioleColorNames = 'primary'
  export let stops: string[] = []
</script>

<div class="flex order-3 md:order-2">
  {#each Object.entries(steppedSwatchColorClasses[color]).filter( ([shade]) => stops.includes(shade), ) as [shade, shadeClasses]}
    <div class="grid grid-rows-[1fr_40px] text-center w-full">
      <div class="h-full flex justify-center items-center {shadeClasses}" data-testid="swatch">
        {#if shade === 'base'}
          <span class="hidden sm:inline-block">Text</span>
        {/if}
      </div>
    </div>
  {/each}
</div>
