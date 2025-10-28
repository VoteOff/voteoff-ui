<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { setContext } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import type { BallotContext } from '$lib/types';
	import { BallotAPI } from '$lib/api/events';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const {
		eventID,
		ballotID,
		votingSystemID,
		token
	}: { eventID: number; ballotID: number; votingSystemID: string; token: string } = $props();
	const config = $derived(votingSystems.find((value) => value.id === votingSystemID));
	const ballotContext: BallotContext = $state({
		submission: {},
		submissionIsValid: false
	});

	setContext('ballot-data', ballotContext);

	const submitVote = async () => {
		const ballotAPI = new BallotAPI();

		await ballotAPI.submitBallot(ballotID, token, ballotContext.submission);
		goto(resolve(`/event/${eventID}/ballot/${ballotID}/results`), { replaceState: true });
	};
</script>

{#if config}
	<config.voting />
{:else}
	Config Error!
{/if}

<Button disabled={!ballotContext.submissionIsValid} onclick={submitVote}>Vote</Button>
