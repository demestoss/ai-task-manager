import appRouter from '../lib/server/router';

export default {
	port: process.env.PORT ?? 3000,
	fetch: appRouter.fetch
};
