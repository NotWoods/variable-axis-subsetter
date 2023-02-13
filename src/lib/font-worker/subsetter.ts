import JSZip from 'jszip';
import pyodideReadyPromise from './pyodide';
import axisSubsetterCode from './axis_subsetter.py?raw';
import getAxesCode from './get_axes.py?raw';

async function zipFontFile(fontFile: ArrayBuffer) {
	const zip = new JSZip();
	zip.file('MyVariableFont.ttf', fontFile);
	return zip.generateAsync({ type: 'arraybuffer' });
}

// TODO put a lock on this somehow
let lastUploaded: ArrayBuffer | undefined;
/**
 * Helper to load a font into Python filesystem.
 * Will bail if the file was already uploaded.
 */
async function uploadFontFile(fontFile: ArrayBuffer) {
	console.log(fontFile);
	if (fontFile === lastUploaded) return;

	const [pyodide, archive] = await Promise.all([pyodideReadyPromise, zipFontFile(fontFile)]);
	pyodide.unpackArchive(archive, 'zip');
}

export type AxisProxy = {
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
export async function getFontAxes(fontFile: ArrayBuffer): Promise<AxisProxy[]> {
	await uploadFontFile(fontFile);
	const pyodide = await pyodideReadyPromise;

	const axesListProxy = await pyodide.runPythonAsync(getAxesCode);
	return Array.from<AxisProxy>(axesListProxy).map((axis) => ({
		axisTag: axis.axisTag,
		axisNameID: axis.axisNameID,
		flags: axis.flags,
		minValue: axis.minValue,
		defaultValue: axis.defaultValue,
		maxValue: axis.maxValue
	}));
}

/**
 * Subset a variable font's axes.
 * @param fontFile Font to subset.
 * @param axes Map of axis names to axis limit instructions.
 */
export async function subsetFontAxes(
	fontFile: ArrayBuffer,
	axes: ReadonlyMap<string, AxisLimit>
): Promise<Uint8Array> {
	await uploadFontFile(fontFile);
	const pyodide = await pyodideReadyPromise;

	const axisSubset = await pyodide.runPythonAsync(axisSubsetterCode);
	axisSubset(axes);

	return pyodide.FS.readFile('MySubsettedFont.ttf', { encoding: 'binary' });
}
