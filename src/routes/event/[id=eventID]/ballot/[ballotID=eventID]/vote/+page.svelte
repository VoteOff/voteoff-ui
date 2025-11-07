<script lang="ts">
	import { page } from '$app/state';
	import { Heading } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { EventContext } from '$lib/types';
	import { voterTokenStorage } from '$lib/token-util';
	import VotingWrapper from '$lib/VotingWrapper.svelte';

	const eventID = $derived(Number(page.params.id));
	const ballotID = $derived(Number(page.params.ballotID));
	const eventContext: EventContext = getContext('event-data');
</script>

<Heading tag="h2" class="my-8 text-center">Voting</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	{#if eventContext.event}
		<VotingWrapper
			{eventID}
			{ballotID}
			votingSystemID={eventContext.event.electoral_system}
			token={voterTokenStorage.getToken(eventID)}
		/>
	{/if}
</div>
