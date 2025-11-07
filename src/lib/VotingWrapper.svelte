<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { setContext } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import type { BallotContext } from '$lib/types';
	import { BallotAPI } from '$lib/api/events';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

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
	let openConfirmationModal = $state(false);

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

<Button disabled={!ballotContext.submissionIsValid} onclick={() => (openConfirmationModal = true)}>
	Submit Vote
</Button>

<Modal bind:open={openConfirmationModal} size="xs" form permanent>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12" />
		<h3 class="mb-5 text-lg font-normal">
			Are you sure you want to submit your vote? You cannot change it after submitting.
		</h3>
		<div class="space-x-2">
			<Button type="submit" value="yes" color="red" onclick={submitVote}>Yes, I'm sure</Button>
			<Button type="submit" value="no" color="alternative">Not yet</Button>
		</div>
	</div>
</Modal>
