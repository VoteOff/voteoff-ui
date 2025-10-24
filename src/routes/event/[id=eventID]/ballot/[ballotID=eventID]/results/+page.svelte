<script lang="ts">
	import { page } from '$app/state';
	import { Heading } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { BallotContext } from '$lib/types';
	import { voterTokenStorage } from '$lib/token-util';
	import ResultWrapper from '$lib/ResultWrapper.svelte';

	const eventID = $derived(Number(page.params.id));
	const ballotContext: BallotContext = getContext('ballot-data');
</script>

<Heading tag="h2" class="my-8 text-center">Results</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	{#if ballotContext.event}
		<ResultWrapper
			{eventID}
			votingSystemID={ballotContext.event.electoral_system}
			token={voterTokenStorage.getToken(eventID)}
		/>
	{/if}
</div>
