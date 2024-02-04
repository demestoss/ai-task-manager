import type { RouterContext } from './context';
import { DatabasePool, makeDatabaseClient } from '@repo/db';
import { finishedTasksRouter } from './modules/finished-task/routes';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { taskRouter } from './modules/task/routes';
import { parseError } from './errors/parseError';
import { prettyJSON } from 'hono/pretty-json';
import { bearerAuth } from 'hono/bearer-auth';
import { env } from 'hono/adapter';

const app = new Hono().get('/ping', (c) => c.text('pong'));

app.use('*', logger());
app.use('*', prettyJSON());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));
app.onError((err, c) => {
  console.error(`${err}`);
  const [text, status] = parseError(err);
  return c.text(text, status);
});

app.use('/api/*', bearerAuth({ token: 'secret_tokenn' }));

let db: DatabasePool;
const apiRouter = new Hono<{ Variables: RouterContext }>().use('*', async (c, next) => {
  if (!db) {
    const { DATABASE_URL, DATABASE_AUTH_TOKEN } = env<{
      DATABASE_URL?: string;
      DATABASE_AUTH_TOKEN?: string;
    }>(c);

    db = makeDatabaseClient(DATABASE_URL, DATABASE_AUTH_TOKEN);
  }

  c.set('db', db);
  await next();
});

const apiRoutes = apiRouter.route(
  '/v1',
  new Hono().route('/tasks', taskRouter).route('/finished-tasks', finishedTasksRouter)
);

app.route('/api', apiRouter);

export default app;
export type ApiRouter = typeof apiRoutes;
