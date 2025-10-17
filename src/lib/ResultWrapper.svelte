<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import votingSystems from '$lib/voting-system/config';
	import { EventsAPI } from '$lib/api/events';
	import type { ResultContext } from './types';

	const {
		eventID,
		votingSystemID,
		token
	}: { eventID: number; votingSystemID: string; token: string } = $props();
	const config = $derived(votingSystems.find((value) => value.id === votingSystemID));
	const resultContext: ResultContext = $state({ ballots: [] });

	setContext('results', resultContext);

	onMount(async () => {
		const api = new EventsAPI();

		resultContext.ballots = await api.listBallots(eventID, token);
		//TODO: Add result fecth timeout.
	});
</script>

{#if config}
	<config.results />
{:else}
	Config Error!
{/if}
