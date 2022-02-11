<script>
	import { random } from '$lib/deps';
	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	let halfX = 2;
	let halfY = 2;
	if (random([0, 1])) {
		halfX = 1;
	} else {
		halfY = 1;
	}
</script>

<g class="half-square">
	<rect height={size} width={size} fill={background} {x} {y} />
	<rect height={size / halfX} width={size / halfY} fill={foreground} {x} {y} />
</g>
