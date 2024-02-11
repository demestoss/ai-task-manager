import { type Context } from 'hono';
import type { Session } from './index';
import { HTTPException } from 'hono/http-exception';

export async function auth<TContext extends Context>(c: TContext): Promise<Session> {
  const passedSession = c.env.session;
  if (passedSession && typeof passedSession === 'object' && passedSession?.user?.id) {
    return passedSession as Session;
  }

  throw new HTTPException(401, { message: 'Unauthorized' });
}
