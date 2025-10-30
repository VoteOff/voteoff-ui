<script lang="ts">
	import type { ResultContext } from '$lib/types';
	import { P } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Submission } from './types';

	let eventContext: EventContext = getContext('event-data');
	const resultContext: ResultContext = getContext('results');

	const calculateWinner = (choiceData, ballotData) => {
		let ballots = ballotData.map((b) => (Array.isArray(b.vote) ? [...b.vote] : []));
		let choices = [...choiceData];

		let winner = null;
		const rounds = [];

		while (winner === null && rounds.length < 10) {
			const tallies = Object.fromEntries(choices.map((choice) => [choice, 0]));

			ballots.forEach((b) => {
				if (b.length > 0) {
					tallies[b[0]]++;
				}
			});

			rounds.push(tallies);

			const validVoteCount = Object.values(tallies).reduce(
				(accumulator, currentValue) => accumulator + currentValue,
				0
			);

			// Tally up round winner and loser (first choices only)

			let roundWinner = choices[0];
			let roundLosers = [choices[0]];

			choices.forEach((choice) => {
				if (tallies[choice] > tallies[roundWinner]) {
					roundWinner = choice;
				}
				if (tallies[choice] < tallies[roundLosers[0]]) {
					roundLosers = [choice];
				}
				if (tallies[choice] === tallies[roundLosers[0]]) {
					roundLosers.push(choice);
				}
			});

			let percents = Object.fromEntries(
				Object.keys(tallies).map((k) => {
					return [k, tallies[k] / validVoteCount];
				})
			);

			// Purge roundLosers from the ballots (and the choice list)

			ballots.forEach((b, i) => {
				ballots[i] = b.filter((i) => !roundLosers.includes(i));
			});
			choices = choices.filter((c) => !roundLosers.includes(c));

			// Check for an overall winner

			if (tallies[roundWinner] / validVoteCount > 0.5) {
				winner = roundWinner;
			}
		}

		return { roundData: rounds, overallWinner: winner };
	};

	let { roundData, overallWinner } = $derived.by(() => {
		if (resultContext.ballots.length > 0) {
			return calculateWinner(eventContext.event.choices, resultContext.ballots);
		} else {
			return { roundData: [], overallWinner: null };
		}
	});
</script>

<h3>{overallWinner} wins!</h3>

<div class="rounds">
	{#each roundData as voteCount, i}
		<div class="round">
			<div class="round-number">Round {i + 1}</div>
			<div class="vote-counts">
				{#each Object.keys(voteCount) as candidate}
					<div>{candidate}: {voteCount[candidate]}</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.rounds {
		display: flex;
		flex-direction: column-reverse;
	}

	.round {
		width: 300px;
		margin-top: 1em;
		padding: 1em 1.5em;
		background-color: #efefef;
		border-radius: 8px;
	}

	.round-number {
		color: #585a60;
		text-transform: uppercase;
		font-weight: lighter;
		font-size: 14px;
		margin-bottom: 0.5em;
	}

	.vote-counts {
		color: #474747;
	}
</style>
