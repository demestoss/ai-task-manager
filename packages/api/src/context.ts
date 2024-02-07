import type { DatabasePool } from '@repo/db';
import type { Session } from '@repo/auth';

export type RouterContext = {
  db: DatabasePool;
  session: Session;
};

export type HonoContext = { Variables: RouterContext };
