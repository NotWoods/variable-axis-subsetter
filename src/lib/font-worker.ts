// TODO use web worker instead
import { getFontAxes, subsetFontAxes, type AxisLimit } from './font-worker/subsetter';

export type { AxisProxy, AxisLimit } from './font-worker/subsetter';

/**
 * Entry point to the font-worker Web Worker.
 */
export class FontWorker {
	constructor(public readonly fontFile: ArrayBuffer) {}

	async getFontAxes() {
		return getFontAxes(this.fontFile);
	}

	async subsetFontAxes(axes: ReadonlyMap<string, AxisLimit>) {
		return subsetFontAxes(this.fontFile, axes);
	}
}
