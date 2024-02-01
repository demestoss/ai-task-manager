import { type BunSQLiteDatabase, drizzle as drizzleBun } from 'drizzle-orm/bun-sqlite';
import { drizzle as drizzleTurso } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { Database } from 'bun:sqlite';

export type DatabasePool = BunSQLiteDatabase;

export function makeLocalDatabaseClient() {
	const sqlite = new Database('sqlite.db');
	return drizzleBun(sqlite);
}

function makeTursoDatabeseClient(url: string, authToken: string) {
	const client = createClient({ url, authToken });
	return drizzleTurso(client);
}

export function makeDatabaseClient(url: string, authToken: string) {
	return makeTursoDatabeseClient(url, authToken);
}
