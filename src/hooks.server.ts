import type { HandleFetch } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (event.url.pathname.startsWith('/api')) {
		request = new Request(`${event.url.protocol}://${API_HOST}${event.url.pathname}`, request);
	}
	console.log('Fetch Request: ', request);
	return await fetch(request);
};
