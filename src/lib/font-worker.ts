import type { MessageData, MessageResult } from './font-worker/font-worker-entry';
import MyWorker from './font-worker/font-worker-entry?worker';
import type { AxisLimit, AxisProxy } from './font-worker/subsetter';

export type { AxisLimit, AxisProxy };

let messageId = 0;
const worker = new MyWorker();

/**
 * Entry point to the font-worker Web Worker.
 */
export class FontWorker {
	private readonly callbacks = new Map<number, (result: PromiseSettledResult<unknown>) => void>();

	constructor(public readonly fontFile: ArrayBuffer) {
		worker.addEventListener('message', (event: MessageEvent<MessageResult<unknown>>) => {
			const callback = this.callbacks.get(event.data.id);
			callback?.(event.data);
		});

		const message = { id: messageId++, type: 'init', fontFile } satisfies MessageData;
		worker.postMessage(message, [message.fontFile]);
	}

	private postMessage<Result>(message: MessageData) {
		return new Promise<Result>((resolve, reject) => {
			this.callbacks.set(message.id, (result) => {
				switch (result.status) {
					case 'fulfilled':
						return resolve(result.value as Result);
					case 'rejected':
						return reject(result.reason);
				}
			});

			worker.postMessage(message);
		});
	}

	async getFontAxes(): Promise<AxisProxy[]> {
		return this.postMessage({ id: messageId++, type: 'getFontAxes' });
	}

	async subsetFontAxes(axes: ReadonlyMap<string, AxisLimit>): Promise<Uint8Array> {
		return this.postMessage({ id: messageId++, type: 'subsetFontAxes', axes });
	}
}
