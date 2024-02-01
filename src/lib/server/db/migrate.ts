import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import type { DatabasePool } from './database';

export async function runMigrations(db: DatabasePool) {
	await migrate(db, { migrationsFolder: '../drizzle' });
}
