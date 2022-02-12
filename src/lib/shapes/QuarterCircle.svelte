<script>
	import { random } from '$lib/deps';
	import { Mask } from '$lib/shapes';

	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	const xOffset = size * random([0, 1], true);
	const yOffset = size * random([0, 1], true);
</script>

<g class="quarter-circle">
	<rect width={size} height={size} fill={background} {x} {y} />
</g>

<Mask {size} {x} {y} let:mask>
	<g {mask}>
		<circle r={size} cx={x + xOffset} cy={y + yOffset} fill={foreground} />
		{#if random(0, 1) < 0.6}
			<circle r={size / 2} cx={x + xOffset} cy={y + yOffset} fill={background} />
		{/if}
	</g>
</Mask>
