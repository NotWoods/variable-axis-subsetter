<script lang="ts">
	import { getFontAxes } from '../lib/font-worker/subsetter';
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await fetch('/demo/RobotoFlex.ttf');
		console.log(await getFontAxes(await response.blob()));
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
