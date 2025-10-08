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
	endpoint: string = '/event';

	getEvent = async (id: number) => {
		return this.get(`/${id}/`) as Promise<EventResponseData>;
	};

	createEvent = async (data: CreateEventRequestData) => {
		return { id: 123124124, ...data } as EventResponseData;
		//TODO: uncomment when implemented
		//return this.post('/create', data) as Promise<EventResponseData>;
	};
}
