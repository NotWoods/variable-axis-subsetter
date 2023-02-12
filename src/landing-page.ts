import { FontWorker } from './lib/font-worker';
import { setFontFace } from './set-font';
import './app.css';
import type { FileDropEvent } from 'file-drop-element';

const lazyApp = import('./App.svelte');

const appContainer = document.getElementById('app')!;

let unloadedLandingPage: DocumentFragment | undefined;
let loadedApp: InstanceType<Awaited<typeof lazyApp>['default']> | undefined;

async function openEditor(file: ArrayBuffer) {
	const [{ default: App }] = await Promise.all([lazyApp, setFontFace(file)]);
	history.pushState(file, '', '/editor');

	unloadedLandingPage = document.createDocumentFragment();
	while (appContainer.firstChild) {
		const child = appContainer.firstChild;
		appContainer.removeChild(child);
		unloadedLandingPage.appendChild(child);
	}
	loadedApp = new App({
		target: appContainer,
		props: {
			fontWorker: new FontWorker(file)
		}
	});
}
async function openEditorFromFileList(files: FileList | readonly File[] | null) {
	if (files && files.length > 0) {
		openEditor(await files[0].arrayBuffer());
	}
}

window.addEventListener('popstate', (event) => {
	switch (document.location.pathname) {
		case '/':
			loadedApp?.$destroy();
			if (unloadedLandingPage) {
				appContainer.append(unloadedLandingPage);
				unloadedLandingPage = undefined;
			} else {
				location.href = '/';
			}
			break;
		case '/editor':
			if (event.state) {
				openEditor(event.state);
			} else {
				location.href = '/';
			}
			break;
	}
});

document.querySelector('input[type="file"]')!.addEventListener('change', (event) => {
	const { files } = event.currentTarget as HTMLInputElement;
	openEditorFromFileList(files);
});
document.querySelector('file-drop')!.addEventListener('filedrop', (event) => {
	const { files } = event as FileDropEvent;
	openEditorFromFileList(files);
});
document.querySelector('#demos')!.addEventListener('click', async (event) => {
	const button = (event.target as Element).closest('button');
	if (button) {
		const response = await fetch(`/demo/${button.value}`);
		openEditor(await response.arrayBuffer());
	}
});

export {};
