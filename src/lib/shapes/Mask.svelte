<script context="module">
	let counter = 0;
</script>

<script>
	export let size;
	export let x;
	export let y;

	let id = `Mask${counter++}`;
</script>

<mask {id}>
	<rect width={size} height={size} fill="#fff" {x} {y} />
</mask>
<slot mask="url(#{id})" />
