<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { getContext } from 'svelte';
	const flipDurationMs = 200;

	let ballotContext: BallotContext = getContext('ballot-data');

	let items = ballotContext.event.choices.map((choiceStr) => {
		return { id: choiceStr, title: choiceStr };
	});

	function handleSort(e) {
		items = e.detail.items;
	}

	function handleFinalize(e) {
	    console.log('handleFinalize()')
		items = e.detail.items;
		ballotContext.submission = items.map((i) => i.id);
	}
</script>

<p>Drag your preferred options to the top.</p>

<section
	use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
	on:consider={handleSort}
	on:finalize={handleFinalize}
>
	{#each items as item, index (item.id)}
		<div class="choice-card" animate:flip={{ duration: flipDurationMs }}>
			<div class="rank-number">
				{index + 1}.
			</div>
			<div>
				{item.title}
			</div>
		</div>
	{/each}
</section>

<style>
	.choice-card {
		display: flex;
		min-width: 15em;
		background-color: #e4e4e4;
		border-radius: 8px;
		margin: 15px;
		padding: 15px 20px;
	}

	.rank-number {
		padding-right: 10px;
		font-weight: bold;
		color: #909090;
	}

	section {
		min-height: 12em;
	}
</style>
