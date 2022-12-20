<script lang="ts">
	import ChangePercent from './ChangePercent.svelte';
	import SizeResult from './SizeResult.svelte';

	export let originalLength: number;
	export let subsetLength: number;
</script>

<div class="size-results">
	<SizeResult byteLength={originalLength} /> <span aria-label="to">→</span>
	<SizeResult byteLength={subsetLength} />
	<ChangePercent {originalLength} {subsetLength} />
</div>

<style>
	.size-results {
		position: absolute;
		bottom: 16px;
		right: calc(var(--sidebar-width) + 16px);
	}
</style>
