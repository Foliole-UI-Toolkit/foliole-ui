<script lang="ts">
	import { inputSettings } from '../data/settings';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleStopChange(event: ChangeEvent<HTMLSelectElement>) {
		const details = { colorIndex: colorsIndex, stops: event?.target?.value };
		dispatch('stopsChange', details);
	}

	export let stops: string;
	export let colorOn: string;
	export let colorsIndex: number;
</script>

<div class="flex order-2 gap-2 lg:order-3">
	<label class="flex-1 label">
		<span>Color Stops</span>
		<select class="input" on:change={handleStopChange} bind:value={stops}>
			{#each inputSettings.stops as s}<option value={s.value}>{s.label}</option>{/each}
		</select>
	</label>
	<label class="flex-1 label">
		<span>Text Color</span>
		<select class="input" bind:value={colorOn}>
			{#each inputSettings.colorProps as c}<option value={c.value}>{c.label}</option>{/each}
		</select>
	</label>
</div>

<style lang="postcss">
</style>
