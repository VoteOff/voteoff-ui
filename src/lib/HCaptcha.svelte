<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_HCAPTCHA_SITE_KEY } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import { on } from 'svelte/events';

	const {
		onsolve
	}: {
		onsolve: (token: string) => void;
	} = $props();

	let captcha: HTMLDivElement;

	const event = browser
		? on(document, 'DOMContentLoaded', () => {
				console.log('hcaptcha loaded');
				hcaptcha.render(captcha, {
					sitekey: PUBLIC_HCAPTCHA_SITE_KEY,
					callback: onsolve
				});
			})
		: () => void 0;

	onDestroy(() => {
		event();
	});
</script>

{#if browser}
	<script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>
{/if}

<div bind:this={captcha}></div>
