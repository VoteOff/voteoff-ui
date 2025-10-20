import { BaseAPI } from './base';

export type EventCreateRequestData = {
	name: string;
	choices: string[];
	electoral_system: string;
};

export type EventResponseData = {
	id: number;
	name: string;
	choices: string[];
	electoral_system: string;
	share_token: string;
};

export type EventCreateResponseData = EventResponseData & {
	host_token: string;
};

export type BallotResponseData = {
	id: number;
	voter_name: string;
	created: string;
	submitted: null | string;
};

export type BallotCreateResponseData = {
	ballot_id: number;
	ballot_token: string;
};

export class EventsAPI extends BaseAPI {
	endpoint: string = '/vote/event';

	getEvent = async (id: number, token: string) => {
		return this.get(`/${id}?token=${token}`) as Promise<EventResponseData>;
	};

	createEvent = async (data: EventCreateRequestData) => {
		return this.post('/create', data) as Promise<EventCreateResponseData>;
	};

	closeEvent = async (eventID: number, token: string) => {
		return this.post(`/${eventID}/close`, { token }, false);
	};

	openEvent = async (eventID: number, token: string) => {
		return this.post(`/${eventID}/open`, { token }, false);
	};

	listBallots = async (eventID: number, token: string) => {
		return this.get(`/${eventID}/ballots?token=${token}`) as Promise<BallotResponseData[]>;
	};

	createBallot = async (eventID: number, name: string, shareToken: string) => {
		return this.post(
			`/${eventID}/create-ballot?voter_name=${name}&share_token=${shareToken}`,
			null
		) as Promise<BallotCreateResponseData>;
	};
}
