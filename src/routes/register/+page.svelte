<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import { EventsAPI } from '$lib/api/events';
	import { Heading, Input, Label, Button } from 'flowbite-svelte';
	import { resolve } from '$app/paths';
	import { voterTokenStorage } from '$lib/token-util';
	import { onMount } from 'svelte';

	const { data }: PageProps = $props();

	let voterName = $state('');

	const isFormValid = $derived(voterName.trim() !== '');

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const api = new EventsAPI();
		const response = await api.createBallot(data.id, voterName, data.share_token);

		voterTokenStorage.saveToken(data.id, response.ballot_token);

		await goto(resolve(`/event/${data.id}/ballot/${response.ballot_id}/vote`));
	};

	onMount(() => {
		//TODO: Fix auto redirect.
		/* if (voterTokenStorage.getToken(data.id)) {
			goto(resolve(`/event/${data.id}/ballot/${response.ballot_id}/vote/`));
		} */
	});
</script>

<Heading tag="h2" class="my-8 text-center">Register for {data.name}</Heading>
<form class="space-y-6" onsubmit={handleSubmit}>
	<div>
		<Label for="name" class="mb-2">Name</Label>
		<Input id="name" placeholder="Enter your name" bind:value={voterName} required />
	</div>

	<div class="flex gap-4">
		<Button type="submit" class="flex-1 cursor-pointer" color="blue" disabled={!isFormValid}>
			Start Voting!
		</Button>
	</div>
</form>
