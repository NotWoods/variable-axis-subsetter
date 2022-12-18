<script lang="ts">
	import { main } from '../lib/font-worker/subsetter';
	import { onMount } from 'svelte';

	onMount(async () => {
		main();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
