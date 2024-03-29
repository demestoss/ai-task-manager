import { handle as authHandle } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorization: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/tasks') || event.url.pathname === '/') {
		const session = await event.locals.auth();
		if (!session) {
			redirect(303, '/login');
		}
	}

	if (event.url.pathname.startsWith('/login')) {
		const session = await event.locals.auth();
		if (session) {
			redirect(304, '/');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle: Handle = sequence(authHandle, authorization);
