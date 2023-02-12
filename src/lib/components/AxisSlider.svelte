<script lang="ts">
	import type { AxisProxy } from '../font-worker';

	const KNOWN_SHORTHANDS: Partial<Record<string, string>> = {
		ital: 'Italic',
		wght: 'Weight',
		wdth: 'Width',
		opsz: 'Optical Size',
		slnt: 'Slant',
		CASL: 'Casual',
		CRSV: 'Cursive',
		FILL: 'Fill',
		GRAD: 'Grade',
		MONO: 'Monospace',
		WONK: 'Wonky',
		XOPQ: 'Thick Stroke',
		XTRA: 'Counter Width',
		YOPQ: 'Thin Stroke',
		YTAS: 'Ascender Height',
		YTDE: 'Descender Depth',
		YTFI: 'Figure Height',
		YTLC: 'Lowercase Height',
		YTUC: 'Uppercase Height'
	};

	export let axis: AxisProxy;
	export let value: number | undefined;

	$: id = `${axis.axisTag}-slider`;
	$: displayValue = value ?? axis.defaultValue;
	$: fullName = KNOWN_SHORTHANDS[axis.axisTag];
</script>

<div class="axis-slider">
	<label for={id}>
		<abbr class:has-full-name={fullName}>{axis.axisTag}</abbr>
		{#if fullName}<span class="full-name">{fullName}</span>{/if}
	</label>
	<output for={id} aria-live="off">{displayValue}</output>
	<input
		type="range"
		{id}
		list="{axis.axisTag}-tickmarks"
		min={axis.minValue}
		max={axis.maxValue}
		name={axis.axisTag}
		value={displayValue}
		on:input
		on:change
	/>

	<datalist id="{axis.axisTag}-tickmarks">
		<option value={axis.minValue} title="Minimum" label={axis.minValue.toString()} />
		<option value={axis.defaultValue} title="Default" label={axis.defaultValue.toString()} />
		<option value={axis.maxValue} title="Maximum" label={axis.maxValue.toString()} />
	</datalist>
</div>

<style>
	.axis-slider {
		display: grid;
		grid-template:
			'tag    output' auto
			'slider slider' auto
			'ticks  ticks ' auto
			/ 1fr auto;
		padding-top: 4px;
		padding-bottom: 4px;
		border-bottom: 1px solid gray;
	}
	.axis-slider:last-child {
		border-bottom-width: 0;
	}

	label {
		grid-area: tag;
	}
	abbr {
		text-decoration: none;
	}
	abbr.has-full-name {
		opacity: 0.75;
		font-size: 0.8rem;
	}
	.full-name {
		display: block;
	}

	output {
		grid-area: output;
	}
	input {
		grid-area: slider;
	}
	datalist {
		grid-area: ticks;
	}
</style>
