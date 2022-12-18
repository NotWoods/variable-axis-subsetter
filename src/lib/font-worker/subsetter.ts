import JSZip from 'jszip';
import pythonCode from './axis_subsetter.py?raw';

declare global {
	const loadPyodide: typeof import('pyodide').loadPyodide;
}

async function loadPyodideAndPackages() {
	const pyodide = await loadPyodide();
	await pyodide.loadPackage('micropip');
	const micropip = pyodide.pyimport('micropip');
	await micropip.install('fonttools[woff]');
	return pyodide;
}
const pyodideReadyPromise = loadPyodideAndPackages();

async function zipFontFile(fontFile: Blob) {
	var zip = new JSZip();
	zip.file('MyVariableFont.ttf', fontFile);
	return zip.generateAsync({
		type: 'arraybuffer'
	});
}

export async function main(fontFile: Blob) {
	const pyodide = await pyodideReadyPromise;

	// TODO upload font file
	pyodide.unpackArchive(await zipFontFile(fontFile), 'zip');

	try {
		let results = await pyodide.runPythonAsync(pythonCode);
		console.log({ results });
	} catch (error: any) {
		console.error({ error: error.message });
	}
}
