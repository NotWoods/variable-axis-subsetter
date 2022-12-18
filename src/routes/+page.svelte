<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		async function loadPyodideAndPackages() {
			const pyodide = await loadPyodide();
			await pyodide.loadPackage('micropip');
			const micropip = pyodide.pyimport('micropip');
			await micropip.install('fonttools[woff]');
			return pyodide;
		}
		let pyodideReadyPromise = loadPyodideAndPackages();

		const pyodide = await pyodideReadyPromise;
		self.postMessage('hello');

		try {
			let results = await pyodide.runPythonAsync(`
      from fontTools.varLib.instancer import instantiateVariableFont

      print(instantiateVariableFont)
    `);
			console.log({ results });
		} catch (error: any) {
			console.error({ error: error.message });
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
