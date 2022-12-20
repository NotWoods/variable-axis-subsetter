import JSZip from 'jszip';
import type { PyProxy } from 'pyodide';
import pyodideReadyPromise from './pyodide';
import axisSubsetterCode from './axis_subsetter.py?raw';
import getAxesCode from './get_axes.py?raw';

async function zipFontFile(fontFile: Blob) {
	var zip = new JSZip();
	zip.file('MyVariableFont.ttf', fontFile);
	return zip.generateAsync({ type: 'arraybuffer' });
}

// TODO put a lock on this somehow
let lastUploaded: Blob | undefined;
/**
 * Helper to load a font into Python filesystem.
 * Will bail if the file was already uploaded.
 */
async function uploadFontFile(fontFile: Blob) {
	if (fontFile === lastUploaded) return;

	const [pyodide, archive] = await Promise.all([pyodideReadyPromise, zipFontFile(fontFile)]);
	pyodide.unpackArchive(archive, 'zip');
}

export type AxisProxy = PyProxy & {
	axisTag: string;
	axisNameID: number;
	flags: number;
	minValue: number;
	defaultValue: number;
	maxValue: number;
};

export type AxisLimit =
	| { type: 'drop' }
	| { type: 'pin'; value: number }
	| { type: 'restrict'; min: number; max: number }
	| { type: 'move'; min: number; default: number; max: number };

/**
 * Returns all the axes in a variable font.
 */
export async function getFontAxes(fontFile: Blob): Promise<AxisProxy[]> {
	await uploadFontFile(fontFile);
	const pyodide = await pyodideReadyPromise;

	const axesListProxy = await pyodide.runPythonAsync(getAxesCode);
	return Array.from<AxisProxy>(axesListProxy);
}

/**
 * Subset a variable font's axes.
 * @param fontFile Font to subset.
 * @param axes Map of axis names to axis limit instructions.
 */
export async function subsetFontAxes(
	fontFile: Blob,
	axes: ReadonlyMap<string, AxisLimit>
): Promise<Uint8Array> {
	await uploadFontFile(fontFile);
	const pyodide = await pyodideReadyPromise;

	const axisSubset = await pyodide.runPythonAsync(getAxesCode);
	axisSubset(axes);

	return pyodide.FS.readFile('MySubsettedFont.ttf', { encoding: 'binary' });
}
