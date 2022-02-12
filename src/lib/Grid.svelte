<script>
	import { random } from '$lib/deps';
	import { shapes, bigShapes } from '$lib/shapes';
	import { getTwoColors } from './colors';
	import { scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import reducedMotion from '$lib/reducedMotion';

	export let colorPalette;

	const squareSize = 100;
	const numRows = random(4, 8, true);
	const numCols = random(4, 8, true);

	// Random multiplier (2 or 3 squares)
	const multiplier = random([2, 3]);
	// Random X position
	const xPosBig = random(0, numRows - multiplier, true) * squareSize;
	// Random Y position
	const yPosBig = random(0, numCols - multiplier, true) * squareSize;

	function isWithinBigShape(x, y) {
		return (
			x >= xPosBig &&
			x < xPosBig + multiplier * squareSize &&
			y >= yPosBig &&
			y < yPosBig + multiplier * squareSize
		);
	}
</script>

<svg
	width="100%"
	height="100%"
	viewBox="0 0 {numRows * squareSize} {numCols * squareSize}"
	out:scale={{ start: $reducedMotion ? 1 : 0.8, opacity: 0, duration: 250 }}
	in:scale={{
		start: $reducedMotion ? 1 : 0.8,
		opacity: 0,
		duration: 400,
		delay: 250,
		easing: backOut
	}}
>
	{#each { length: numRows } as _, i}
		{#each { length: numCols } as _, j}
			{@const x = i * squareSize}
			{@const y = j * squareSize}
			{@const blockStyle = isBig ? random(bigShapes) : random(shapes)}
			{@const { foreground, background } = getTwoColors(colorPalette)}
			{@const isBig = x === xPosBig && y === yPosBig}
			{@const size = isBig ? squareSize * multiplier : squareSize}
			{#if !isWithinBigShape(x, y) || isBig}
				<svelte:component this={blockStyle} {size} {x} {y} {foreground} {background} />
			{/if}
		{/each}
	{/each}
</svg>

<style>
	svg :global(*) {
		/* Removes little gaps between the shapes */
		shape-rendering: crispEdges;
	}
</style>
