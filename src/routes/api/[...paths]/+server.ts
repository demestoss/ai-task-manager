import apiRouter from '$lib/server/router';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const POST: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const DELETE: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const PUT: RequestHandler = ({ request }) => apiRouter.fetch(request);
