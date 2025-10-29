<script lang="ts">
	import type { BallotContext, ResultContext } from '$lib/types';
	import { P } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Submission } from './types';

	const ballotContext: BallotContext = getContext('ballot-data');
	const resultContext: ResultContext = getContext('results');

	const calculateWinner = (choices, ballots) => {
	    console.log($state.snapshot(ballots))

	    let winner = null

	    do {
            const firstChoiceCount = Object.fromEntries(choices.map((choice) => [choice, 0]))

            ballots.forEach((b) => {
                if (Array.isArray(b.vote) && b.vote) {
                    firstChoiceCount[b.vote[0]]++
                }
            })

            winner = choices[0]
            let loser = choices[0]

            // Tally up round winner and loser (first choices only)

            choices.forEach((choice) => {
                if (firstChoiceCount[choice] > firstChoiceCount[winner]) {
                    winner = choice
                }
                if (firstChoiceCount[choice] < firstChoiceCount[loser]) {
                    loser = choice
                }
            })

            console.log(winner, "%%%", loser)

            // Purge loser from the ballots

            ballots = ballots.forEach((b) => {
                console.log("BE", $state.snapshot(b.vote))

                // tODO something going wrong below

                //if (Array.isArray(b.vote)) {
                    //b.vote = b.vote.filter((i) => i !== loser)
                //}
                //console.log("AF", $state.snapshot(b.vote))
            })

        } while (choices[winner] / choices.length > .5)
        //} while (false)

        console.log("winner:", winner)

	}


    $effect(() => {
        calculateWinner(ballotContext.event.choices, resultContext.ballots)
    })


	let votes = $derived(
		resultContext.ballots
	);
</script>
