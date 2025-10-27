<script lang="ts">
	import { page } from '$app/state';
	import { Button, Heading } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import type { BallotContext } from '$lib/types';
	import { voterTokenStorage } from '$lib/token-util';
	import { BallotAPI } from '$lib/api/events';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const eventID = $derived(Number(page.params.id));
	const ballotID = $derived(Number(page.params.ballotID));
	const ballotContext: BallotContext = getContext('ballot-data');

	const submitVote = async () => {
		const ballotAPI = new BallotAPI();
		const token = voterTokenStorage.getToken(eventID);

		await ballotAPI.submitBallot(ballotID, token, ballotContext.submission);
		goto(resolve(`/event/${eventID}/ballot/${ballotID}/results`), { replaceState: true });
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
			Config Error!
		{/if}

		<Button onclick={submitVote}>Vote</Button>
	{/if}
</div>
