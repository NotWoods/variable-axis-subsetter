// @ts-check
import { svelte } from '@sveltejs/vite-plugin-svelte';

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

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [svelte(), redirectPlugin()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
