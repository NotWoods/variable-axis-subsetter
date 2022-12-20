<script lang="ts">
	import AxisSlider from './lib/components/AxisSlider.svelte';
	import FontPreview from './lib/components/FontPreview.svelte';
	import SizeResults from './lib/components/size/SizeResults.svelte';
	import type { FontWorker } from './lib/font-worker';

	export let fontWorker: FontWorker;

	// let limits = new Map<string, AxisLimit>();
	let displayValues = new Map<string, number>();

	$: axisList = fontWorker.getFontAxes();

	function onAxisSliderChange(event: Event) {
		const { name, value } = event.currentTarget as HTMLInputElement;
		displayValues.set(name, parseFloat(value));
		displayValues = displayValues;
	}
</script>

<main>
	<FontPreview {displayValues} />

	<aside>
		{#await axisList}
			Loading...
		{:then axes}
			{#each axes as axis (axis.axisTag)}
				<AxisSlider {axis} value={displayValues.get(axis.axisTag)} on:input={onAxisSliderChange} />
			{/each}
		{/await}
	</aside>

	<SizeResults
		originalLength={fontWorker.fontFile.byteLength}
		subsetLength={fontWorker.fontFile.byteLength}
	/>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr var(--sidebar-width);
	}
	aside {
		padding: 16px;
		overflow-y: auto;
		background: #eeeeee;
	}
</style>
