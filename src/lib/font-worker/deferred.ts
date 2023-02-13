export interface Deferred<T> extends Promise<T> {
	resolve(value?: T | PromiseLike<T>): void;
	reject(reason?: unknown): void;
}

/**
 * Creates a Promise with the `reject` and `resolve` functions placed as methods
 * on the promise object itself.
 *
 * @example
 * ```typescript
 * import { deferred } from "https://deno.land/std@$STD_VERSION/async/deferred.ts";
 *
 * const p = deferred<number>();
 * // ...
 * p.resolve(42);
 * ```
 */
export function deferred<T>(): Deferred<T> {
	let methods: Pick<Deferred<T>, 'resolve' | 'reject'>;
	const promise = new Promise<T>((resolve, reject) => {
		methods = {
			async resolve(value: T | PromiseLike<T>) {
				await value;
				resolve(value);
			},
			reject(reason?: unknown) {
				reject(reason);
			}
		};
	});
	return Object.assign(promise, methods!);
}
