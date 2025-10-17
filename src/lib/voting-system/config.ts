import type { Component } from 'svelte';

//Ranked Choice
import RankedChoiceVoting from './components/ranked-choice/RankedChoiceVoting.svelte';
import RankedChoiceResults from './components/ranked-choice/RankedChoiceResults.svelte';

//Plurality
import PluralityVoting from './components/plurality/PluralityVoting.svelte';
import PluralityResults from './components/plurality/PluralityResults.svelte';

const config: { id: string; label: string; voting: Component; results: Component }[] = [
	{ id: 'RC', label: 'Ranked Choice', voting: RankedChoiceVoting, results: RankedChoiceResults },
	{ id: 'PL', label: 'Plurality', voting: PluralityVoting, results: PluralityResults }
] as const;

export default config;
