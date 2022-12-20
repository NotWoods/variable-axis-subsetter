<script lang="ts">
	import type { AxisProxy } from '../font-worker';

	const KNOWN_SHORTHANDS: Partial<Record<string, string>> = {
		wght: 'Weight'
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
</div>

<datalist id="{axis.axisTag}-tickmarks">
	<option value={axis.minValue} label="min: {axis.minValue}" />
	<option value={axis.defaultValue} label="default: {axis.defaultValue}" />
	<option value={axis.maxValue} label="max: {axis.maxValue}" />
</datalist>
