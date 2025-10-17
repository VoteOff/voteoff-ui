import type { Component } from 'svelte';

//Ranked Choice
import RankedChoiceVoting from './components/ranked-choice/RankedChoiceVoting.svelte';
import RankedChoiceResults from './components/ranked-choice/RankedChoiceResults.svelte';

//Plurality
import PluralityVoting from './components/plurality/PluralityVoting.svelte';
import PluralityResults from './components/plurality/PluralityResults.svelte';

export const config: Record<string, { voting: Component; results: Component }> = {
	RC: { voting: RankedChoiceVoting, results: RankedChoiceResults },
	PL: { voting: PluralityVoting, results: PluralityResults }
};
