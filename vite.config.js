// @ts-check
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

/** @return {import('vite').Plugin} */
function redirectPlugin() {
	return {
		name: 'redirect',
		configureServer(server) {
			server.middlewares.use('/editor', (_req, res) => {
				res.writeHead(307, { Location: '/' });
				res.end();
			});
		}
	};
}

export default defineConfig({
	plugins: [svelte(), redirectPlugin()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			pyodide: 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.mjs'
		}
	}
});
