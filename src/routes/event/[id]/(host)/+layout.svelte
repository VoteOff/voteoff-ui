<script lang="ts">
	import { BottomNav, BottomNavItem, Button, Modal } from 'flowbite-svelte';
	import {
		ShareNodesOutline,
		GridOutline,
		LockSolid,
		ExclamationCircleOutline
	} from 'flowbite-svelte-icons';
	import { page } from '$app/state';

	let { children } = $props();

	let activeUrl = $derived(page.url.pathname);
	let eventID = $derived(page.params.id);
	let confirmationModalOpen = $state(false);

	const onCloseEvent = () => {
		console.log('TODO: Close Event');
	};
</script>

<div class="pb-24">
	{@render children?.()}
</div>

<BottomNav {activeUrl} navType="application" classes={{ inner: 'grid-cols-3' }}>
	<BottomNavItem href="/event/{eventID}/invitation" btnName="Invitation" appBtnPosition="left">
		<ShareNodesOutline class="h-6 w-6" />
	</BottomNavItem>
	<BottomNavItem href="/event/{eventID}/status" btnName="Status" appBtnPosition="middle">
		<GridOutline class="h-6 w-6" />
	</BottomNavItem>
	<BottomNavItem
		btnName="Close Vote"
		appBtnPosition="right"
		class="cursor-pointer"
		onclick={() => {
			confirmationModalOpen = true;
		}}
	>
		<LockSolid />
	</BottomNavItem>
</BottomNav>

<Modal form bind:open={confirmationModalOpen} size="xs" permanent>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to close voting to this event?
		</h3>
		<div class="space-x-2">
			<Button type="submit" value="yes" color="red" class="cursor-pointer" onclick={onCloseEvent}>
				Yes, I'm sure
			</Button>
			<Button type="submit" value="no" color="alternative" class="cursor-pointer">
				No, cancel
			</Button>
		</div>
	</div>
</Modal>
