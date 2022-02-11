import { random, tinycolor } from '$lib/deps';

export function getBackgroundColors(colorPalette) {
	const bg = tinycolor.mix(colorPalette[0], colorPalette[1], 50).desaturate(10).toString();

	// Make Lighter version
	const bgInner = tinycolor(bg).lighten(10).toString();
	// And darker version
	const bgOuter = tinycolor(bg).darken(10).toString();
	return { bgInner, bgOuter };
}

export function getTwoColors(colors) {
	let colorList = [...colors];
	// Get random index for this array of colors
	const colorIndex = random(0, colorList.length - 1, true);
	// Set the background to the color at that array
	const background = colorList[colorIndex];
	// Remove that color from the options
	colorList.splice(colorIndex, 1);
	// Set the foreground to any other color in the array
	const foreground = random(colorList);

	return { foreground, background };
}
