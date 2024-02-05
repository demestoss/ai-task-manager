import { drizzle as drizzleTurso, type LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { schema } from './schema';

export type DatabasePool = LibSQLDatabase<typeof schema>;

function makeTursoDatabaseClient(url: string, authToken: string) {
  const client = createClient({ url, authToken });
  return drizzleTurso(client, {
    schema,
    logger: true
  });
}

let db: DatabasePool | null = null;

export function getDatabaseClient(url?: string, authToken?: string) {
  if (!url) {
    throw new Error('Missing url parameter for database config');
  }
  if (!authToken) {
    throw new Error('Missing auth token parameter for database config');
  }

  if (!db) {
    db = makeTursoDatabaseClient(url, authToken);
  }

  return db;
}
