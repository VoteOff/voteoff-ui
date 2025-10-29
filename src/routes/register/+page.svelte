<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import { BallotAPI, EventsAPI } from '$lib/api/events';
	import { Heading, Input, Label, Button, Spinner } from 'flowbite-svelte';
	import { resolve } from '$app/paths';
	import { voterTokenStorage } from '$lib/token-util';
	import { onMount } from 'svelte';

	const { data }: PageProps = $props();

	let voterName = $state('');
	let loading: boolean | undefined = $state(undefined);

	const isFormValid = $derived(voterName.trim() !== '');

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const api = new EventsAPI();
		const response = await api.createBallot(data.id, voterName, data.share_token);

		voterTokenStorage.saveToken(data.id, response.ballot_token);

		await goto(resolve(`/event/${data.id}/ballot/${response.ballot_id}/vote`));
	};

	onMount(async () => {
		// Don't show loading spinner if we can respond quickly
		const timer = setTimeout(() => {
			loading = true;
		}, 200);
		const token = voterTokenStorage.getToken(data.id);

		if (token) {
			const api = new BallotAPI();

			let ballot = await api.getBallotFromToken(voterTokenStorage.getToken(data.id)!);

			if (ballot) {
				await goto(resolve(`/event/${data.id}/ballot/${ballot.id}/vote/`));
			}
		}

		clearTimeout(timer);
		loading = false;
	});
</script>

{#if loading === false}
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
{:else if loading === true}
	<span><Spinner /> Loading...</span>
{/if}
