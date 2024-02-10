import { getDatabaseClient, tableCreator } from '@repo/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GitHub from '@auth/core/providers/github';
import type { AuthConfig } from '@auth/core';

export type { Session, DefaultSession } from '@auth/core/types';

declare module '@auth/core/types' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

interface Env {
  GITHUB_ID?: string;
  GITHUB_SECRET?: string;
  DATABASE_URL?: string;
  DATABASE_AUTH_TOKEN?: string;
  AUTH_SECRET?: string;
}

export function getAuthOptions(env?: Env, options?: Partial<AuthConfig>) {
  const db = getDatabaseClient(env?.DATABASE_URL, env?.DATABASE_AUTH_TOKEN);

  return {
    adapter: DrizzleAdapter(db, tableCreator),
    providers: [
      GitHub({
        clientId: env?.GITHUB_ID,
        clientSecret: env?.GITHUB_SECRET
      })
    ],
    secret: env?.AUTH_SECRET,
    trustHost: true,
    ...options
  };
}
