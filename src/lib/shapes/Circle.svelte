<script>
	import { random } from '$lib/deps';
	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;
</script>

<g class="draw-circle">
	<rect width={size} height={size} fill={background} {x} {y} />
	<circle r={size / 2} cx={x + size / 2} cy={y + size / 2} fill={foreground} />
	{#if random(0, 1) < 0.3}
		<circle r={size / 4} cx={x + size / 2} cy={y + size / 2} fill={background} />
	{/if}
</g>
