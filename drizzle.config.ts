import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: 'sqlite.db'
	},
} satisfies Config;