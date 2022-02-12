import { randomWords } from '$lib/deps';

export const get = () => {
	return {
		body: {
			seed: randomWords()
		}
	};
};
