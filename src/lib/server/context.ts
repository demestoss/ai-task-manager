import type { DatabasePool } from './db/database';

export type RouterContext = {
	db: DatabasePool;
};
