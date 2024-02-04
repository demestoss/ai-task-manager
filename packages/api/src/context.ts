import type { DatabasePool } from '@repo/db';

export type RouterContext = {
  db: DatabasePool;
};
