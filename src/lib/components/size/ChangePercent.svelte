<script lang="ts">
	export let originalLength: number;
	export let subsetLength: number;

	$: change = Math.floor(1 - subsetLength / originalLength) * 100;
</script>

<span class="change" class:decrease={change < 1} class:increase={change > 1}>
	<span
		class="direction"
		aria-label={change < 1 ? 'Decreased by' : change > 1 ? 'Increased by' : undefined}
	>
		{#if change < 1}
			↓
		{:else if change > 1}
			↑
		{/if}
	</span>
	{change}%
</span>

<style>
</style>
