<script>
	import A11yDialog from 'a11y-dialog';

	let dialog;
	function init(node) {
		dialog = new A11yDialog(node);

		return {
			destroy: () => dialog.destroy()
		};
	}

	export function show() {
		dialog.show();
	}

	export function hide() {
		dialog.hide();
	}

	let titleId = 'dialog-title';
</script>

<div aria-labelledby={titleId} aria-hidden="true" class="dialog-container" use:init>
	<div data-a11y-dialog-hide class="dialog-overlay" />
	<div role="document" class="dialog-content">
		<button type="button" aria-label="Close dialog" data-a11y-dialog-hide> &times; </button>
		<h1 id={titleId}><slot name="title" /></h1>
		<slot />
	</div>
</div>

<style>
	.dialog-container {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2;
	}

	.dialog-container[aria-hidden='true'] {
		display: none;
	}

	.dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(43, 46, 56, 0.9);
		animation: fade-in 200ms both;
	}

	.dialog-content {
		background-color: rgb(255, 255, 255);
		margin: auto;
		z-index: 2;
		position: relative;
		animation: fade-in 400ms 200ms both, slide-up 400ms 200ms both;
		padding: 1em;
		max-width: 90%;
		width: 600px;
		border-radius: 2px;
	}

	@media screen and (min-width: 700px) {
		.dialog-content {
			padding: 2em;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes slide-up {
		from {
			transform: translateY(10%);
		}
	}

	h1 {
		margin: 0;
		font-size: 1.25em;
	}

	button {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		border: 0;
		padding: 0;
		background-color: transparent;
		font-weight: bold;
		font-size: 1.25em;
		width: 1.2em;
		height: 1.2em;
		text-align: center;
		cursor: pointer;
		transition: 0.15s;
	}

	@media screen and (min-width: 700px) {
		button {
			top: 1em;
			right: 1em;
		}
	}
</style>
