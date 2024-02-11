import { apiRouter } from '@repo/api';
import type { RequestHandler } from '@sveltejs/kit';

const handler: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth();

	return apiRouter.fetch(request, { session });
};

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
