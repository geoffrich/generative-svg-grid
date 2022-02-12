<script>
	import { random } from '$lib/deps';
	import { Mask } from '$lib/shapes';

	export let size;
	export let foreground;
	export let background;
	export let x;
	export let y;

	const selectedCharacters = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		// O removed for looking like a circle
		'P',
		// Q removed for an annoying descender
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
		'&'
	];
	const char = random(selectedCharacters);

	let fontSize = size * 1.2;
	let rotation = random([0, 90, 180, 270]);
</script>

<Mask {size} {x} {y} let:mask>
	<g {mask} class="letter-block">
		<rect height={size} width={size} fill={background} {x} {y} />
		<text
			x={x + size / 2}
			y={y + size / 2 + fontSize / 3}
			transform="rotate({rotation}, {x + size / 2}, {y + size / 2})"
			font-family="Source Code Pro"
			font-size={fontSize}
			font-weight="800"
			text-anchor="middle"
			fill={foreground}>{char}</text
		>
	</g>
</Mask>
