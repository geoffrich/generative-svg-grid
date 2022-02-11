<script>
	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;
</script>

<g class="diagonal-square">
	<rect height={size} width={size} fill={background} {x} {y} />
	{#if Math.random() > 0.5}
		<polygon points="{x},{y} {x},{y + size}, {x + size},{y}" fill={foreground} />
	{:else}
		<polygon points="{x},{y} {x + size},{y}, {x + size},{y + size}" fill={foreground} />
	{/if}
</g>
