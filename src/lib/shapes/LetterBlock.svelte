<script>
	import { SVG, random } from '$lib/deps';

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

	function mask(node) {
		const mask = SVG().rect(size, size).fill('#fff').move(x, y);
		SVG(node).maskWith(mask);
	}

	function transformText(node) {
		SVG(node)
			.center(x + size / 2, y + size / 2)
			.rotate(random([0, 90, 180, 270]));
	}
</script>

<g class="letter-block" use:mask>
	<rect height={size} width={size} fill={background} {x} {y} />
	<text
		use:transformText
		font-family="Source Code Pro"
		font-size={size * 1.2}
		font-weight="800"
		text-anchor="middle"
		fill={foreground}>{char}</text
	>
</g>
