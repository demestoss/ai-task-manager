import type { DatabasePool } from '@repo/db';
import type { Session } from '@repo/auth';
import type { AiModule } from '@repo/ai';

export type RouterContext = {
  db: DatabasePool;
  session: Session;
  ai: AiModule;
};

export type HonoContext = { Variables: RouterContext };
