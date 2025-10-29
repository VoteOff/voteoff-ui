<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { setContext } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import type { BallotContext } from '$lib/types';
	import { BallotAPI } from '$lib/api/events';

	const {
		ballotID,
		votingSystemID,
		token,
		onSubmitVote
	}: {
		ballotID: number;
		votingSystemID: string;
		token: string;
		onSubmitVote: () => void;
	} = $props();
	const config = $derived(votingSystems.find((value) => value.id === votingSystemID));
	const ballotContext: BallotContext = $state({
		submission: {},
		submissionIsValid: false
	});

	setContext('ballot-data', ballotContext);

	const submitVote = async () => {
		const ballotAPI = new BallotAPI();

		await ballotAPI.submitBallot(ballotID, token, ballotContext.submission);
		onSubmitVote();
	};
</script>

{#if config}
	<config.voting />
{:else}
	Config Error!
{/if}

<Button disabled={!ballotContext.submissionIsValid} onclick={submitVote}>Vote</Button>
