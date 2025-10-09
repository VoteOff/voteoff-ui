import type { EventBallotResponseData, EventResponseData } from '$lib/api/events';

export type HostContext = { ballots: EventBallotResponseData[]; event: EventResponseData | null };
