<script lang="ts" context="module">
	const k = 1024;
	// k ** index == size of unit
	const units = [
		{ abbr: 'b', name: 'bytes' },
		{ abbr: 'kB', name: 'kilobytes' },
		{ abbr: 'MB', name: 'megabytes' },
		{ abbr: 'GB', name: 'gigabytes' }
	];

	/**
	 * Clamp a number `n` between two values.
	 */
	const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

	/**
	 * Convert a byte length like `1025` to `1.01 kB`.
	 */
	export function convertToUnit(byteLength: number) {
		let pow = Math.floor(Math.log(byteLength) / Math.log(k));
		pow = clamp(pow, 0, units.length - 1);

		const size = byteLength / k ** pow;
		return {
			size: size.toFixed(2),
			unit: units[pow]
		};
	}
</script>

<script lang="ts">
	export let byteLength: number;

	$: ({ size, unit } = convertToUnit(byteLength));
</script>

{size} <abbr class="unit" title={unit.name}>{unit.abbr}</abbr>

<style>
	.unit {
		opacity: 0.76;
		text-decoration: none;
	}
</style>
