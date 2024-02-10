import { apiRouter } from '@repo/api';
import type { RequestHandler } from '@sveltejs/kit';

const handler: RequestHandler = ({ request }) => {
  return
}

export const GET: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const POST: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const DELETE: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const PUT: RequestHandler = ({ request }) => apiRouter.fetch(request);
export const PATCH: RequestHandler = ({ request }) => apiRouter.fetch(request);
