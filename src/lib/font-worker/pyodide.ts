import { loadPyodide } from 'pyodide';

async function loadPyodideAndPackages() {
	const pyodide = await loadPyodide();
	await pyodide.loadPackage('micropip');
	const micropip = pyodide.pyimport('micropip');
	await micropip.install('fonttools[woff]');
	return pyodide;
}

const pyodideReadyPromise = loadPyodideAndPackages();
export default pyodideReadyPromise;
