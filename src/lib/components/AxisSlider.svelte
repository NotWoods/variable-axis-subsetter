<script lang="ts">
	import type { AxisProxy } from '../font-worker';

	const KNOWN_SHORTHANDS: Partial<Record<string, string>> = {
		wght: 'Weight',
		wdth: 'Width',
		opsz: 'Optical Size'
	};

	export let axis: AxisProxy;
	export let value: number | undefined;

	$: id = `${axis.axisTag}-slider`;
	$: displayValue = value ?? axis.defaultValue;
</script>

<div class="axis-slider">
	<label for={id}>
		<abbr title={KNOWN_SHORTHANDS[axis.axisTag]}>{axis.axisTag}</abbr>
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
