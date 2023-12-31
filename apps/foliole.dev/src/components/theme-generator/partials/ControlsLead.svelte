<script lang="ts">
  export let hex: string
  export let label: string
</script>

<div class="flex justify-center gap-2">
  <div class="flex flex-col w-[45%] justify-center items-center">
    <label for="color-input" class="text-center"> {label}</label>
    <input id="color-input" class="input-color-base" type="color" bind:value={hex} />
  </div>

  <div class="flex flex-col w-[55%]">
    <label for="text-input">Input</label>
    <input id="text-input" class="my-input" type="text" bind:value={hex} placeholder="#BADA55" />
  </div>
</div>
