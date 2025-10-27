<script lang="ts">
	import type { BallotContext, ResultContext } from '$lib/types';
	import { P } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Submission } from './types';

	const ballotContext: BallotContext = getContext('ballot-data');
	const resultContext: ResultContext = getContext('results');

	let votes: { choice: string; count: number }[] = $derived(
		ballotContext.event?.choices.map((choice) => ({
			choice,
			count: resultContext.ballots.filter((ballot) => (ballot.vote as Submission).choice === choice)
				.length
		})) || []
	);
</script>

{#if ballotContext.event}
	{#each votes as vote (vote.choice)}
		<P class="my-2">
			{vote.choice}: {vote.count}
		</P>
	{/each}
{/if}
