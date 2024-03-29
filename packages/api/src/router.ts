import type { HonoContext } from './context';
import { getDatabaseClient } from '@repo/db';
import { finishedTasksRouter } from './modules/finished-task/routes';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { taskRouter } from './modules/task/routes';
import { parseError } from './errors/parseError';
import { env } from 'hono/adapter';
import { auth } from '@repo/auth/hono';

const app = new Hono<HonoContext>().get('/ping', (c) => c.text('pong'));

app.use('*', logger());

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.onError((err, c) => {
  console.error(`${err}`);
  const [text, status] = parseError(err);
  return c.text(text, status);
});

const apiRoutes = app
  .use('*', async (c, next) => {
    const session = await auth(c);
    c.set('session', session);

    const { DATABASE_URL, DATABASE_AUTH_TOKEN } = env<{
      DATABASE_URL?: string;
      DATABASE_AUTH_TOKEN?: string;
      // @ts-ignore
    }>(c);

    const db = getDatabaseClient(DATABASE_URL, DATABASE_AUTH_TOKEN);
    c.set('db', db);

    await next();
  })
  .route('/api/v1/tasks', taskRouter)
  .route('/api/v1/finished-tasks', finishedTasksRouter);

export default app;
export type ApiRouter = typeof apiRoutes;
