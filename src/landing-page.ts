import { FontWorker } from './lib/font-worker';
import { setFontFace } from './set-font';
import './app.css';

const lazyApp = import('./App.svelte');

async function openEditor(file: ArrayBuffer) {
	const [{ default: App }] = await Promise.all([lazyApp, setFontFace(file)]);
	history.pushState(null, '', '/editor');

	const target = document.getElementById('app')!;
	while (target.firstChild) {
		target.removeChild(target.firstChild);
	}
	new App({
		target,
		props: {
			fontWorker: new FontWorker(file)
		}
	});
}

document.querySelector('input[type="file"')?.addEventListener('change', async (event) => {
	const input = event.currentTarget as HTMLInputElement;
	if (!input.files || input.files.length === 0) return;
	openEditor(await input.files[0].arrayBuffer());
});
document.querySelector('demos')?.addEventListener('click', async (event) => {
	const button = (event.target as Element).closest('button');
	if (button) {
		const response = await fetch(`/demos/${button.value}`);
		openEditor(await response.arrayBuffer());
	}
});

export {};
