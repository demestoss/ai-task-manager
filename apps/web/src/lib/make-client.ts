import type { ApiRouter } from '@repo/api';
import { hc } from 'hono/client';

let browserClient: ReturnType<typeof hc<ApiRouter>>;

export const makeClient = (fetch: Window['fetch']) => {
	const isBrowser = typeof window !== 'undefined';
	const origin = isBrowser ? window.location.origin : '';

	if (isBrowser && browserClient) {
		return browserClient;
	}

	const client = hc<ApiRouter>(origin, {
		fetch
	});

	if (isBrowser) {
		browserClient = client;
	}

	return client;
};
