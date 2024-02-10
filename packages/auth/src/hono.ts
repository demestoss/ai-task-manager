import { Auth } from '@auth/core';
import { type Context } from 'hono';
import { getAuthOptions } from './index';
import { env } from 'hono/adapter';
import type { Session } from './index';
import { HTTPException } from 'hono/http-exception';

export async function auth<TContext extends Context>(c: TContext) {
  const config = getAuthOptions(env(c));

  const origin = new URL(c.req.url).origin;
  const request = new Request(`${origin}/api/auth/session`, {
    headers: { cookie: c.req.header('cookie') ?? '' }
  });

  const response = await Auth(request, config);
  const session = (await response.json()) as Session | null;

  if (!session) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }

  return session;
}
