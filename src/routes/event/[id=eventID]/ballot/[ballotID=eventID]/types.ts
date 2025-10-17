import type { EventResponseData } from '$lib/api/events';

export type BallotContext = {
	event: null | EventResponseData;
	submission: unknown;
};
