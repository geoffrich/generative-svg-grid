<script>
	export let title;
	export let image;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@geoffrich_" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:image" content={image} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={image} />
</svelte:head>
