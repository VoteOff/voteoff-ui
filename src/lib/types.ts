import type { BallotResponseData, EventResponseData } from '$lib/api/events';

export type ResultContext = { ballots: BallotResponseData[] };
export type BallotContext = {
	event: null | EventResponseData;
	submission: Record<string, unknown>;
};
