import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { taskRouter } from './modules/task/routes';
import { parseError } from './errors/parseError';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono().get('/ping', (c) => c.text('pong'));

app.use('*', logger());
app.use('*', prettyJSON());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));
app.onError((err, c) => {
	console.error(`${err}`);
	const [text, status] = parseError(err);
	return c.text(text, status);
});
app;

const apiRouter = new Hono();

const apiRoutes = apiRouter.route('/v1', new Hono().route('/tasks', taskRouter));

app.route('/api', apiRouter);

export default app;
export type ApiRouter = typeof apiRoutes;
