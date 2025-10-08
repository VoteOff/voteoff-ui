<script lang="ts">
	import { page } from '$app/state';
	import QRCode from '@castlenine/svelte-qrcode';
	import { Button, Heading, Tooltip } from 'flowbite-svelte';
	import {
		ClipboardCheckOutline,
		ClipboardCleanOutline,
		RefreshOutline
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let registeredVoters: string[] = $state([]);

	let shareURL: string = $derived(
		page.url.protocol + '//' + page.url.host + '/event/' + page.params.id + '/voter'
	);

	let copied = $state(false);

	const onCopyClick = () => {
		navigator.clipboard.writeText(shareURL);
		copied = true;
	};

	let timeoutID: NodeJS.Timeout;

	const getRegisteredVoters = async () => {
		//TODO: Replace with actual API call to fetch voters
		registeredVoters.push('Alice');
		clearTimeout(timeoutID);
		timeoutID = setTimeout(getRegisteredVoters, 10000);
	};

	onMount(() => {
		getRegisteredVoters();
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
		<Button class="ml-4" color="blue" onclick={getRegisteredVoters}>
			<RefreshOutline aria-label="Refresh registered voters" />
		</Button>
	</div>
	{#if registeredVoters.length > 0}
		<ul>
			{#each registeredVoters as voter}
				<li>{voter}</li>
			{/each}
		</ul>
	{:else}
		<p>No voters have registered yet.</p>
	{/if}
</div>
