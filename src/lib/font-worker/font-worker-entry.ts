import { getFontAxes, subsetFontAxes, type AxisLimit } from './subsetter';

export type MessageData =
	| { id: number; type: 'init'; fontFile: ArrayBuffer }
	| { id: number; type: 'getFontAxes' }
	| { id: number; type: 'subsetFontAxes'; axes: ReadonlyMap<string, AxisLimit> };

export type MessageResult<T> = PromiseSettledResult<T> & { id: number };

let fontFile: ArrayBuffer | undefined;
function getFontFile(): ArrayBuffer {
	if (!fontFile) throw new Error('Font file not initialized');
	return fontFile;
}

async function handleMessage(message: MessageData) {
	switch (message.type) {
		case 'init':
			fontFile = message.fontFile;
			return undefined;
		case 'getFontAxes':
			return getFontAxes(getFontFile());
		case 'subsetFontAxes':
			return subsetFontAxes(getFontFile(), message.axes);
	}
}

self.addEventListener('message', (event: MessageEvent<MessageData>) => {
	const message = event.data;
	handleMessage(message)
		.then((value) => {
			self.postMessage({
				id: message.id,
				status: 'fulfilled',
				value
			} satisfies MessageResult<unknown>);
		})
		.catch((reason) => {
			console.error('Worker message error', reason, message);
			self.postMessage({
				id: message.id,
				status: 'rejected',
				reason
			} satisfies MessageResult<unknown>);
		});
});
