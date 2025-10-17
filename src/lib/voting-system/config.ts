import type { Component } from 'svelte';
import votingComponents from './components/voting';
import resultsComponents from './components/results';

export const config: Record<string, { voting: Component; results: Component }> = {
	RC: { voting: votingComponents.RankedChoice, results: resultsComponents.RankedChoice }
};
