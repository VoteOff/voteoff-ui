<script lang="ts">
	import { page } from '$app/state';
	import { Heading } from 'flowbite-svelte';
	import { getContext, onMount } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import type { BallotContext } from '../types';
	import { voterTokenStorage } from '$lib/token-util';
	import { EventsAPI } from '$lib/api/events';

	const eventID = $derived(Number(page.params.id));
	const ballotID = $derived(Number(page.params.id));
	const ballotContext: BallotContext = getContext('ballot-data');

	onMount(async () => {
		const api = new EventsAPI();
		const token = voterTokenStorage.getToken(eventID);

		ballotContext.event = await api.getEvent(eventID, token);
		ballotContext.ballots = await api.listBallots(eventID, token);
	});
</script>

<Heading tag="h2" class="my-8 text-center">Results</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	{#if ballotContext.event}
		{@const config = votingSystems.find(
			(value) => value.id === ballotContext.event?.electoral_system
		)}
		{#if config}
			<config.results />
		{:else}
			Config Error!
		{/if}
	{/if}
</div>
