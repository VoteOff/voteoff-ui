<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="justify-top flex min-h-screen w-screen flex-col items-center">
	<div class="h-full w-full max-w-5xl">
		{@render children?.()}
	</div>
</div>
