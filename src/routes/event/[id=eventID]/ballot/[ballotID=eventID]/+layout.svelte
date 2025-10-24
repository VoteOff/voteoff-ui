<script lang="ts">
	import { page } from '$app/state';
	import { EventsAPI } from '$lib/api/events';
	import { voterTokenStorage } from '$lib/token-util';
	import { onMount, setContext } from 'svelte';
	import type { BallotContext } from '$lib/types';

	const { children } = $props();

	const eventID = $derived(Number(page.params.id));
	const ballotContext: BallotContext = $state({
		event: null,
		submission: {}
	});
	setContext('ballot-data', ballotContext);

	onMount(async () => {
		const api = new EventsAPI();
		const token = voterTokenStorage.getToken(eventID);

		ballotContext.event = await api.getEvent(eventID, token);
	});
</script>

{@render children()}
