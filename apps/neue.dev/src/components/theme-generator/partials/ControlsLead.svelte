<script lang="ts">
  export let hex: string
  export let label: string
</script>

<div class="flex justify-center gap-2">
  <div class="flex flex-col w-[45%] justify-center items-center">
    <label class="text-center"> {label}</label>
    <input class="input-color-base" type="color" bind:value={hex} />
  </div>

  <div class="flex flex-col w-[55%]">
    <label>Input</label>
    <input class="my-input" type="text" bind:value={hex} placeholder="#BADA55" />
  </div>
</div>
