<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { EventsAPI } from '$lib/api/events';
	import { Button } from 'flowbite-svelte';

	let eventID = $derived(page.params.id);

	const openEvent = async () => {
		if (eventID === undefined) return;

		const api = new EventsAPI();
		await api.openEvent(eventID, localStorage.getItem('event_token') || '');

		await goto(resolve(`/event/${eventID}/host/status/`));
	};
</script>

All Results <Button onclick={openEvent}>Open Event</Button>
