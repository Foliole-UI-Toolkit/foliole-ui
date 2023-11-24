<script lang="ts">
	export let label: string;
	export let hex: string;
</script>

<label class="label">
	<span class="lg:font-normal font-bold">{label}</span>
	<div class="grid grid-cols-[auto_1fr] gap-4 place-items-end">
		<input class="input" type="color" bind:value={hex} />
		<input class="input" type="text" bind:value={hex} placeholder="#BADA55" />
	</div>
</label>
