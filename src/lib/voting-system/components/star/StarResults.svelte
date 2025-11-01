<script lang="ts">
	import type { EventContext, ResultContext } from '$lib/types';
	import { P, Star } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { StarSubmission } from './types';

	const eventContext: EventContext = getContext('event-data');
	const resultContext: ResultContext = getContext('results');

	function calulateRatings(submissions: StarSubmission[], choice: string): number {
		let total = 0;
		for (const submission of submissions) {
			const ratingObj = submission.find((s) => s.choice === choice);
			if (ratingObj && ratingObj.rating > 0) {
				total += ratingObj.rating;
			}
		}
		return total;
	}

	let totalRatings: { choice: string; total: number }[] = $derived(
		eventContext.event?.choices
			.map((choice) => ({
				choice,
				total: calulateRatings(
					resultContext.ballots.map((ballot) => ballot.vote as StarSubmission),
					choice
				)
			}))
			.sort((a, b) => b.total - a.total) || []
	);

	function getRunoffData(ratingTotals: { choice: string; total: number }[]) {
		let winnerVotes = 0;
		let runnerupVotes = 0;

		if (ratingTotals.length > 1) {
			resultContext.ballots.forEach((ballot) => {
				const submission = ballot.vote as StarSubmission;
				const winnerRatingObj = submission.find((s) => s.choice === ratingTotals[0].choice);
				const runnerupRatingObj = submission.find((s) => s.choice === ratingTotals[1].choice);

				if (winnerRatingObj && runnerupRatingObj) {
					if (winnerRatingObj.rating > runnerupRatingObj.rating) {
						winnerVotes++;
					} else if (runnerupRatingObj.rating > winnerRatingObj.rating) {
						runnerupVotes++;
					}
				}
			});

			return {
				winner: winnerVotes > runnerupVotes ? ratingTotals[0].choice : ratingTotals[1].choice,
				winnerVotes,
				runnerupVotes
			};
		} else if (ratingTotals.length === 1) {
			return {
				winner: ratingTotals[0].choice,
				winnerVotes: 0,
				runnerupVotes: 0
			};
		} else {
			return undefined;
		}
	}

	let runoffData = $derived(getRunoffData(totalRatings));
</script>

{#if eventContext}
	{#each totalRatings as vote, index (vote.choice)}
		<div class="flex flex-wrap items-center justify-center gap-2">
			<P class="my-2">
				{vote.choice} - {vote.total}
			</P>
			<Star fillPercent={100} size={20} ariaLabel="Star icon" />
			{#if runoffData && vote.choice === runoffData.winner}
				<P size="sm" class="font-bold text-green-600">(Winner - {runoffData.winnerVotes})</P>
			{/if}
			{#if runoffData && index === 1}
				<P size="sm" class="font-bold text-blue-600">(Runner-up - {runoffData.runnerupVotes})</P>
			{/if}
		</div>
	{/each}
{/if}
