<script lang="ts">
	export let displayValues: ReadonlyMap<string, number>;

	$: variationSettings = Array.from(displayValues)
		.map(([axis, value]) => `"${axis}" ${value}`)
		.join(', ');
</script>

<section
	style="font-family: MyVariableFont; font-variation-settings: {variationSettings}"
	class="sample"
	contenteditable="true"
	autocomplete="off"
	autocorrect="off"
	autocapitalize="off"
	spellcheck="false"
>
	ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
</section>

<style>
	.sample {
		font-family: MyVariableFont;
		font-size: 5.5em;
		word-break: break-all;
	}
</style>
