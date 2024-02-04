import { makeDatabaseClient } from './database';
import { migrate } from 'drizzle-orm/libsql/migrator';
import * as process from 'node:process';

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

const db = makeDatabaseClient(url, authToken);

await migrate(db, { migrationsFolder: './drizzle' });
