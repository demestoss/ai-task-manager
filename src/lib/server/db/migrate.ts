import { makeLocalDatabaseClient } from '$lib/server/db/database';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

const db = makeLocalDatabaseClient();

migrate(db, { migrationsFolder: './src/lib/server/drizzle' });
