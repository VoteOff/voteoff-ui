<script lang="ts">
	import { page } from '$app/state';
	import { EventsAPI } from '$lib/api/events';
	import { voterTokenStorage } from '$lib/token-util';
	import { onMount, setContext } from 'svelte';
	import type { EventContext } from '$lib/types';

	const { children } = $props();

	const eventID = $derived(Number(page.params.id));
	const eventContext: EventContext = $state({
		event: null
	});
	setContext('event-data', eventContext);

	onMount(async () => {
		const api = new EventsAPI();
		const token = voterTokenStorage.getToken(eventID);

		eventContext.event = await api.getEvent(eventID, token);
	});
</script>

{@render children()}
