<script>
	import { SVG } from '$lib/deps';
	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	function center(node) {
		SVG(node).center(x + size / 2, y + size / 2);
	}

	function rotate(node) {
		SVG(node).transform({ rotate: 90 });
	}

	function conditionalRotate(node) {
		if (Math.random() < 0.4) {
			SVG(node).transform({ rotate: 45, origin: 'center center' });
		}
	}
</script>

<g class="draw-cross">
	<rect width={size} height={size} fill={background} {x} {y} />
</g>
<g use:conditionalRotate>
	<rect
		use:center
		width={size / 1.5}
		height={size / 5}
		fill={foreground}
		x={x + size / 2}
		y={y + size / 2}
	/>
	<rect
		use:center
		use:rotate
		width={size / 1.5}
		height={size / 5}
		fill={foreground}
		x={x + size / 2}
		y={y + size / 2}
	/>
</g>
