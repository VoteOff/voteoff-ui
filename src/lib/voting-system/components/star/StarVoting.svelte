<script lang="ts">
	import type { BallotContext, EventContext } from '$lib/types';
	import { P, Star } from 'flowbite-svelte';
	import { CloseOutline } from 'flowbite-svelte-icons';
	import { getContext, onMount } from 'svelte';
	import type { StarSubmission } from './types';

	let ratings: StarSubmission = $state([]);

	let eventContext: EventContext = getContext('event-data');
	let ballotContext: BallotContext = getContext('ballot-data');

	function onRatingClick(choice: string, rating: number) {
		const selectedChoice = ratings.find((r) => r.choice === choice);
		if (selectedChoice) {
			selectedChoice.rating = rating;
		}
		ballotContext.submission = ratings;
	}

	onMount(() => {
		// Initialize ratings for each choice
		if (eventContext.event) {
			ratings = eventContext.event.choices.map((choice) => ({ choice, rating: 0 }));
		}
		ballotContext.submissionIsValid = true;
	});
</script>

<P class="text-center">Rate the dishes.</P>

<div class="items-between flex-col">
	{#if eventContext.event}
		{#each eventContext.event.choices as choice (choice)}
			{@const ratingObj = ratings.find((r) => r.choice === choice)}
			<div class="my-2 flex w-full items-center justify-between gap-4">
				<P size="lg" class="font-bold">{choice}</P>
				<div class="flex items-center">
					{#each Array(5), index (index)}
						<button
							class="flex cursor-pointer items-center justify-center"
							onclick={() => onRatingClick(choice, index + 1)}
						>
							<Star
								iconIndex={index}
								groupId={choice}
								fillPercent={(ratingObj?.rating ?? 0) > index ? 100 : 0}
								size={50}
								ariaLabel={`Rate ${index + 1} star${index == 0 ? '' : 's'}`}
							/>
						</button>
					{/each}
					<button
						class="mx-4 flex cursor-pointer items-center justify-center p-2 pt-1.5 pb-0.5"
						onclick={() => onRatingClick(choice, 0)}
					>
						<CloseOutline class="h-5 w-5 shrink-0" />
					</button>
				</div>
			</div>
		{/each}
	{/if}
</div>
