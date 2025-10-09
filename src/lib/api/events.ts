import { BaseAPI } from './base';

export type CreateEventRequestData = {
	name: string;
	choices: string[];
	electoral_system: 'RC' | 'PL';
};

export type EventResponseData = CreateEventRequestData & {
	id: string;
};

export type EventBallotResponseData = {
	id: number;
	voter_name: string;
	vote: unknown;
	submitted: undefined | string;
};

export class EventsAPI extends BaseAPI {
	endpoint: string = '/event';

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

	createEvent = async (data: CreateEventRequestData) => {
		return { id: 'asd123124124', ...data } as EventResponseData;
		//TODO: uncomment when implemented
		//return this.post('/create', data) as Promise<EventResponseData>;
	};

	getBallots = async (eventID: string) => {
		console.log(eventID);
		return [
			{ id: 0, voter_name: 'John Doe' },
			{ id: 1, voter_name: 'Jane Doe' }
		] as EventBallotResponseData[];
		//TODO: uncomment when implemented
		//return this.get(`/${eventID}/votes/`) as Promise<EventBallotResponseData[]>;
	};
}
