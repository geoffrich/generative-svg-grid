<script>
	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;
</script>

<g class="draw-circle">
	<rect width={size} height={size} fill={background} {x} {y} />
	<circle r={size / 2} cx={x + size / 2} cy={y + size / 2} fill={foreground} />
</g>
