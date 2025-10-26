import type { HandleFetch } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (event.url.pathname.startsWith('/api')) {
		request = new Request(
			`${event.url.protocol}://${env.API_HOST ? env.API_HOST : 'localhost'}${event.url.pathname}`,
			request
		);
	}
	return await fetch(request);
};
