<script>
	import { random } from '$lib/deps';
	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	let width = size / 1.5;
	let height = size / 5;
	let centerX = x + size / 2;
	let centerY = y + size / 2;
	let startX = centerX - width / 2;
	let startY = centerY - height / 2;

	let shouldRotate = random(0, 1) < 0.4;
</script>

<g class="draw-cross">
	<rect width={size} height={size} fill={background} {x} {y} />
</g>
<g transform={shouldRotate ? `rotate(45, ${centerX}, ${centerY})` : undefined}>
	<rect {width} {height} fill={foreground} x={startX} y={startY} />
	<rect
		{width}
		{height}
		fill={foreground}
		x={startX}
		y={startY}
		transform="rotate(90, {centerX}, {centerY})"
	/>
</g>
