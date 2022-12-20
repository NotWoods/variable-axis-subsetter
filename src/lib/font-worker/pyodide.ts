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
export default pyodideReadyPromise;
