<script lang="ts">
	import { page } from '$app/state';
	import { EventsAPI } from '$lib/api/events';
	import QRCode from '@castlenine/svelte-qrcode';
	import { Button, Heading, Tooltip } from 'flowbite-svelte';
	import {
		ClipboardCheckOutline,
		ClipboardCleanOutline,
		RefreshOutline
	} from 'flowbite-svelte-icons';
	import { getContext, onMount } from 'svelte';
	import type { HostContext } from '../type';

	const hostContext: HostContext = getContext('host-context');

	let shareURL: string = $derived(
		page.url.protocol + '//' + page.url.host + '/event/' + page.params.id + '/voter'
	);

	let copied = $state(false);

	const onCopyClick = () => {
		navigator.clipboard.writeText(shareURL);
		copied = true;
	};

	let timeoutID: NodeJS.Timeout;

	const getBallots = async () => {
		//TODO: Replace with actual API call to fetch voters
		if (!page.params.id) return;
		const api = new EventsAPI();
		hostContext.ballots = await api.getBallots(page.params.id);
		clearTimeout(timeoutID);
		timeoutID = setTimeout(getBallots, 10000);
	};

	onMount(() => {
		getBallots();
		return () => clearTimeout(timeoutID);
	});
</script>

<Heading tag="h2" class="my-8 text-center">Event Invitation</Heading>
<div class="my-4 flex flex-col items-center gap-4">
	<QRCode data={shareURL} />

	<Button onclick={onCopyClick} class="flex cursor-pointer items-center gap-2">
		{#if copied}
			<ClipboardCheckOutline class="h-6 w-6 shrink-0" />
		{:else}
			<ClipboardCleanOutline class="h-6 w-6 shrink-0" />
		{/if}
		<span class="sr-only">
			{copied ? 'Invitation link copied to clipboard' : 'Copy invitation to clipboard'}
		</span>
		{shareURL}
	</Button>
	<Tooltip>Copy to clipboard</Tooltip>

	<div class="flex items-baseline">
		<Heading tag="h3" class="mt-8">Registered Voters</Heading>
		<Button class="ml-4" color="blue" onclick={getBallots}>
			<RefreshOutline aria-label="Refresh registered voters" />
		</Button>
	</div>
	{#if hostContext.ballots.length > 0}
		<ul>
			{#each hostContext.ballots as ballot (ballot.id)}
				<li>{ballot.voter_name}</li>
			{/each}
		</ul>
	{:else}
		<p>No voters have registered yet.</p>
	{/if}
</div>
