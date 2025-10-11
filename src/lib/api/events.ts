import { BaseAPI } from './base';

export type EventCreateRequestData = {
	name: string;
	choices: string[];
	electoral_system: 'RC' | 'PL';
};

export type EventCreateResponseData = {
	id: string;
	event_token: string;
};

export type EventResponseData = EventCreateRequestData & {
	id: string;
};

export type EventBallotResponseData = {
	id: number;
	voter_name: string;
	vote: unknown;
	submitted: undefined | string;
};

export class EventsAPI extends BaseAPI {
	endpoint: string = '/vote/event';

	getEvent = async (id: string) => {
		return {
			id,
			name: 'Sample Event',
			choices: ['Option 1', 'Option 2'],
			electoral_system: 'RC'
		} as EventResponseData;
		//TODO: Replace with actual API call
		//return this.get(`/${id}/`) as Promise<EventResponseData>;
	};

	createEvent = async (data: EventCreateRequestData) => {
		return this.post('/create', data) as Promise<EventCreateResponseData>;
	};

	closeEvent = async (eventID: string, token: string) => {
		return this.post(`/${eventID}/close`, { token }, false);
	};

	openEvent = async (eventID: string, token: string) => {
		return this.post(`/${eventID}/open`, { token }, false);
	};

	getBallots = async (/*TODO: Uncomment. eventID: string*/) => {
		return [
			{ id: 0, voter_name: 'John Doe' },
			{ id: 1, voter_name: 'Jane Doe' }
		] as EventBallotResponseData[];
		//TODO: uncomment when implemented
		//return this.get(`/${eventID}/votes/`) as Promise<EventBallotResponseData[]>;
	};
}
