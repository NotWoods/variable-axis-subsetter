<script lang="ts">
	import PaperGrain from './PaperGrain.svelte';

	export let showOutput: boolean = false;
	export let displayValues: ReadonlyMap<string, number>;

	$: fontFamily = showOutput ? 'MySubsettedFont' : 'MyVariableFont';
	$: variationSettings = Array.from(displayValues)
		.map(([axis, value]) => `"${axis}" ${value}`)
		.join(', ');
</script>

<PaperGrain>
	<section
		style="font-family: {fontFamily}; font-variation-settings: {variationSettings || 'initial'}"
		class="sample"
		contenteditable="true"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	>
		ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
	</section>
</PaperGrain>

<style>
	.sample {
		font-family: MyVariableFont;
		font-size: 5.5em;
		word-break: break-all;
		padding-inline: 8px;
	}
</style>
