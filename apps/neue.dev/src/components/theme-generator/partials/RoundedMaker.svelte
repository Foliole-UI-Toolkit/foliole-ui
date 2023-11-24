<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function emitBtnOptsChange() {
    roundedSize = event.target.value
    dispatch('roundedOptsChange', {
      roundedSize,
    })
  }

  export let roundedSize = 'md'
  const roundedOpts = {
    none: 'none',
    xs: '3px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  }
</script>

<!-- Add the select dropdown in your template -->
<select bind:value={roundedSize} on:change={emitBtnOptsChange}>
  {#each Object.entries(roundedOpts) as [key, value]}
    <option {value}>{key}</option>
  {/each}
</select>

<style lang="postcss">
  /* Your CSS styles for rounded classes here */
</style>
