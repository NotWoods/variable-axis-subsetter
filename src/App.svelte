<script lang="ts">
	import AxisSlider from './lib/components/AxisSlider.svelte';
	import FontPreview from './lib/components/FontPreview.svelte';
	import PaperGrain from './lib/components/PaperGrain.svelte';
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
		<PaperGrain>
			<div class="sliders">
				{#await axisList}
					Loading...
				{:then axes}
					{#each axes as axis (axis.axisTag)}
						<AxisSlider
							{axis}
							value={displayValues.get(axis.axisTag)}
							on:input={onAxisSliderChange}
						/>
					{/each}
				{/await}
			</div>
		</PaperGrain>
	</aside>

	<SizeResults
		originalLength={fontWorker.fontFile.byteLength}
		subsetLength={fontWorker.fontFile.byteLength}
	/>
</main>

<style>
	main {
		display: grid;
		height: 100vh;
		height: 100dvh;
		grid-template-columns: 1fr var(--sidebar-width);
	}
	aside {
		background: var(--surface-variant-color);
	}
	.sliders {
		padding: 16px;
	}
</style>
