<script>
	import { SVG, random } from '$lib/deps';

	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	const xOffset = size * random([0, 1], true);
	const yOffset = size * random([0, 1], true);

	function mask(node) {
		const mask = SVG().rect(size, size).fill('#fff').move(x, y);
		SVG(node).maskWith(mask);
	}
</script>

<g class="quarter-circle">
	<rect width={size} height={size} fill={background} {x} {y} />
</g>

<g use:mask>
	<circle r={size} cx={x + xOffset} cy={y + yOffset} fill={foreground} />
	{#if Math.random() < 0.6}
		<circle r={size / 2} cx={x + xOffset} cy={y + yOffset} fill={background} />
	{/if}
</g>
