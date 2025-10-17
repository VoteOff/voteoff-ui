<script lang="ts">
	import { page } from '$app/state';
	import { Button, Heading } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import type { BallotContext } from '../types';

	const ballotID = $derived(Number(page.params.id));
	const ballotContext: BallotContext = getContext('ballot-data');

	const submitVote = () => {
		//TODO: Implement API.
		console.log($state.snapshot(ballotContext.submission), ballotID);
	};
</script>

<Heading tag="h2" class="my-8 text-center">Voting</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	{#if ballotContext.event}
		{@const config = votingSystems.find(
			(value) => value.id === ballotContext.event?.electoral_system
		)}
		{#if config}
			<config.voting />
		{:else}
			Config Error
		{/if}

		<Button onclick={submitVote}>Vote</Button>
	{/if}
</div>
