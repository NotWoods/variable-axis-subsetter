import { loadPyodide } from './pyodide';

async function loadPyodideAndPackages() {
	const pyodide = await loadPyodide();
	await pyodide.loadPackage('micropip');
	const micropip = pyodide.pyimport('micropip');
	await micropip.install('fonttools[woff]');
	return pyodide;
}
let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
	// make sure loading is done
	console.log('worker', event.data);
	const pyodide = await pyodideReadyPromise;
	self.postMessage('hello');

	try {
		let results = await pyodide.runPythonAsync(`
      from fontTools.varLib.instancer import instantiateVariableFont

      print(instantiateVariableFont)
    `);
		self.postMessage({ results });
	} catch (error: any) {
		self.postMessage({ error: error.message });
	}
};
