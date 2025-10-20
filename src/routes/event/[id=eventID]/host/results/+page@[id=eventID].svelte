<script lang="ts">
	import { page } from '$app/state';
	import { Heading } from 'flowbite-svelte';
	import { hostTokenStorage } from '$lib/token-util';
	import ResultWrapper from '$lib/ResultWrapper.svelte';
	import { onMount } from 'svelte';
	import { EventsAPI, type EventResponseData } from '$lib/api/events';

	const eventID = $derived(Number(page.params.id));
	let event: EventResponseData | null = $state(null);
	let token: string = $state('');

	onMount(async () => {
		const api = new EventsAPI();
		token = hostTokenStorage.getToken(eventID);

		event = await api.getEvent(eventID, token);
	});
</script>

<Heading tag="h2" class="my-8 text-center">Results</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	{#if event}
		<ResultWrapper {eventID} votingSystemID={event.electoral_system} {token} />
	{/if}
</div>
