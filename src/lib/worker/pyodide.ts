importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js');

declare global {
	const loadPyodide: typeof import('pyodide').loadPyodide;
}

export { loadPyodide };
