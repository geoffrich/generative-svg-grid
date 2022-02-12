<script>
	// based on https://frontend.horse/articles/generative-grids/
	import '../app.css';
	import Grid from '$lib/Grid.svelte';
	import { random, colors, interpolateLab as interpolate, randomWords, seedPRNG } from '$lib/deps';
	import { getBackgroundColors } from '$lib/colors';
	import { tweened } from 'svelte/motion';

	export let seed;

	let counter = 0;

	let colorPalette = [];

	let bgInner = tweened(undefined, { duration: 500, interpolate });
	let bgOuter = tweened(undefined, { duration: 500, interpolate });

	seedPRNG(seed);

	regenerate();

	function regenerate() {
		counter++;
		newPalette();
	}

	function newSeed() {
		seed = randomWords();
	}

	function newPalette() {
		colorPalette = random(colors);
		const background = getBackgroundColors(colorPalette);
		$bgInner = background.bgInner;
		$bgOuter = background.bgOuter;
	}

	function setSeed() {
		seedPRNG(seed);
		regenerate();
	}
</script>

<div class="container" style:--bg-inner={$bgInner} style:--bg-outer={$bgOuter}>
	<div class="grid">
		<div class="top">
			<div class="colors">
				{#each colorPalette as color}
					<div class="palette" style:background-color={color} />
				{/each}
			</div>
			<form class="seed" on:submit|preventDefault={setSeed}>
				<label for="seed">Random seed</label>
				<input id="seed" type="text" bind:value={seed} />
				<button type="button" on:click={newSeed}> New seed </button>
				<button> Go </button>
			</form>
		</div>
		{#key counter}
			<Grid {colorPalette} />
		{/key}
	</div>
</div>

<button class="button" aria-label="Regenerate" type="button" on:click={regenerate}>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
		/>
	</svg>
	<span>Regenerate</span>
</button>

<style>
	.seed {
		position: relative;
	}

	.top {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: start;
		justify-content: space-between;
	}

	input {
		font-size: 1rem;
	}

	label {
		color: white;
		position: absolute;
		top: -1rem;
		font-size: 0.75rem;
	}

	.button {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 0.5rem;
		margin: 0;
		border-top-left-radius: 12px;
		background: #ffffffcc;
		border: 0.5px solid #555555cc;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		font-weight: 600;
		color: #333;
		font-size: 0.75rem;
	}

	.button svg {
		width: 1.25rem;
		transition: 0.3s ease-in-out transform;
	}

	.button:hover svg {
		transform: rotate(-45deg);
	}

	:is(input, button):focus,
	:is(input, button):active {
		outline: 2px solid #f06;
	}

	.button:focus svg,
	.button:active svg {
		transform: rotate(-90deg);
	}

	.container {
		height: 100vh;
		padding: 1rem;
		background-image: radial-gradient(var(--bg-inner) 0%, var(--bg-outer) 100%);
	}

	.grid {
		display: grid;
		grid-template-rows: 5rem auto 2rem;
		height: 100%;
	}

	.grid > :global(*):not(.top) {
		/* transition enforcement */
		grid-column: 1/2;
		grid-row: 2/3;
	}

	.colors {
		display: flex;
		border: 1px solid black;
	}

	.palette {
		height: 20px;
		width: 20px;
	}
</style>
