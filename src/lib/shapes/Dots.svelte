<script>
	import { random } from '$lib/deps';

	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	const sizeOptions = [2, 3, 4];
	const dotSize = random(sizeOptions);

	const offset = 10;
	const circleSize = 10;
	const space = (size - offset * 2 - circleSize) / (dotSize - 1);
</script>

<g class="dots">
	<rect width={size} height={size} fill={background} {x} {y} />
	{#each { length: dotSize } as _, i}
		{#each { length: dotSize } as _, j}
			<circle
				r={circleSize / 2}
				fill={foreground}
				cx={x + (offset * 3) / 2 + i * space}
				cy={y + (offset * 3) / 2 + j * space}
			/>
		{/each}
	{/each}
</g>
