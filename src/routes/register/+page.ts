import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { EventsAPI } from '$lib/api/events';

export const load: PageLoad = async ({ url, fetch }) => {
	const eventID = Number(url.searchParams.get('e'));
	const shareToken = url.searchParams.get('s');

	if (!shareToken || isNaN(eventID)) {
		error(400, 'Invalid Share URL');
	}
	const api = new EventsAPI(fetch);
	const event = await api.getEvent(eventID, shareToken);

	return event;
};
