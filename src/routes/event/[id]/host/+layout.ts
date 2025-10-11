import { EventsAPI } from '$lib/api/events';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const api = new EventsAPI();
	const event = await api.getEvent(params.id);
	const ballots = await api.getBallots(/*TODO: Remove comment. params.id*/);

	return {
		event,
		ballots
	};
};
