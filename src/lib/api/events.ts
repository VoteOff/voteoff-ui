import { BaseAPI } from './base';

type CreateEventRequestData = {
	name: string;
	choices: string[];
	electoral_system: 'RC' | 'PL';
};

type EventResponseData = CreateEventRequestData & {
	id: number;
};

export class EventsAPI extends BaseAPI {
	endpoint: string = '/events';

	getEvent = async (id: number) => {
		return this.get(`/events/${id}/`) as Promise<EventResponseData | undefined>;
	};

	createEvent = async (data: CreateEventRequestData) => {
		return this.post('/events/create', data) as Promise<EventResponseData | undefined>;
	};
}
