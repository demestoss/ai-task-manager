import type { HonoContext } from './context';
import { getDatabaseClient } from '@repo/db';
import { finishedTasksRouter } from './modules/finished-task/routes';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { taskRouter } from './modules/task/routes';
import { parseError } from './errors/parseError';
import { env } from 'hono/adapter';
import { auth } from '@repo/auth/hono';
import { HTTPException } from 'hono/http-exception';
import { DummyAiModule, OpenAIModule } from '@repo/ai';

const app = new Hono<HonoContext>().get('/ping', (c) => c.text('pong'));

app.use('*', logger());

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.onError((err, c) => {
  console.error(`${err}`);
  const [text, status] = parseError(err);
  return c.json({ error: text }, status);
});

const apiRoutes = app
  .use('*', async (c, next) => {
    // @ts-ignore
    const session = await auth(c);
    c.set('session', session);

    const { DATABASE_URL, DATABASE_AUTH_TOKEN, OPENAI_SECRET_KEY } = env<{
      DATABASE_URL?: string;
      DATABASE_AUTH_TOKEN?: string;
      OPENAI_SECRET_KEY?: string;
      // @ts-ignore
    }>(c);

    const db = getDatabaseClient(DATABASE_URL, DATABASE_AUTH_TOKEN);
    c.set('db', db);

    if (session.user.aiEnabled && !OPENAI_SECRET_KEY) {
      throw new HTTPException(500, {
        message: 'OpenAI Secret Key is required for AI to be enabled'
      });
    }

    const ai = session.user.aiEnabled ? new OpenAIModule(OPENAI_SECRET_KEY!) : new DummyAiModule();
    c.set('ai', ai);

    await next();
  })
  .route('/api/v1/tasks', taskRouter)
  .route('/api/v1/finished-tasks', finishedTasksRouter);

export default app;
export type ApiRouter = typeof apiRoutes;
