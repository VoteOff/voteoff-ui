<script lang="ts">
	import { page } from '$app/state';
	import { Heading } from 'flowbite-svelte';
	import { getContext, onMount } from 'svelte';
	import type { BallotContext } from '../types';
	import { voterTokenStorage } from '$lib/token-util';
	import { EventsAPI } from '$lib/api/events';
	import ResultWrapper from '$lib/ResultWrapper.svelte';

	const eventID = $derived(Number(page.params.id));
	const ballotContext: BallotContext = getContext('ballot-data');
	let token: string = $state('');

	onMount(async () => {
		const api = new EventsAPI();
		token = voterTokenStorage.getToken(eventID);
	});
</script>

<Heading tag="h2" class="my-8 text-center">Results</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	{#if ballotContext.event && token}
		<ResultWrapper {eventID} votingSystemID={ballotContext.event.electoral_system} {token} />
	{/if}
</div>
