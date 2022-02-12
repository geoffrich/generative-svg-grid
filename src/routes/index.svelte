<script>
	import '../app.css';
	import Grid from '$lib/Grid.svelte';
	import Dialog from '$lib/Dialog.svelte';
	import { random, colors, interpolateLab as interpolate, randomWords, seedPRNG } from '$lib/deps';
	import { getBackgroundColors } from '$lib/colors';
	import { tweened } from 'svelte/motion';

	export let seed;

	let counter = 0;

	let colorPalette = [];
	/** @type {Dialog} */
	let dialog;

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

<svelte:head>
	<title>Beautiful Generative SVG Grids</title>
</svelte:head>

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

<div class="footer">
	<button class="info-button" on:click={() => dialog.show()}>
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>Info</span></button
	>

	<button class="regenerate-button" on:click={regenerate}>
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
			/>
		</svg>
		<span>Regenerate</span>
	</button>
</div>

<Dialog bind:this={dialog}>
	<span slot="title">About this site</span>
	<ul>
		<li>
			Built by <a href="https://geoffrich.net/">Geoff Rich</a> using
			<a href="https://kit.svelte.dev/">SvelteKit</a>
		</li>
		<li>
			Adapted from the Frontend Horse article <a
				href="https://frontend.horse/articles/generative-grids/">Creating Generative SVG Grids</a
			>
		</li>
		<li>Code available on <a href="https://github.com/geoffrich/generative-svg-grid">GitHub</a></li>
	</ul>
</Dialog>

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

	.footer {
		display: flex;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		justify-content: space-between;
	}

	.footer button {
		padding: 0.5rem;
		margin: 0;
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

	.regenerate-button {
		border-top-left-radius: 12px;
	}

	.info-button {
		border-top-right-radius: 12px;
	}

	.info-button svg {
		width: 1.25rem;
	}

	.regenerate-button svg {
		width: 1.25rem;
		transition: 0.3s ease-in-out transform;
	}

	.regenerate-button:hover svg {
		transform: rotate(-45deg);
	}

	:is(input, button):focus,
	:is(input, button):active {
		outline: 2px solid #f06;
	}

	.regenerate-button:focus svg,
	.regenerate-button:active svg {
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
