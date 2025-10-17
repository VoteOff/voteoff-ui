import type { BallotResponseData, EventResponseData } from '$lib/api/events';

export type BallotContext = {
	event: null | EventResponseData;
	ballots: BallotResponseData[];
	submission: unknown;
};
