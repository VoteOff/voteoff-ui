import type { BallotResponseData, EventResponseData } from '$lib/api/events';

export type HostContext = { ballots: BallotResponseData[]; event: EventResponseData | null };
