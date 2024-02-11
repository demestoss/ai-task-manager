import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const tableCreator = (
  name: string,
  columns: Parameters<typeof sqliteTable>[1],
  extraConfig?: Parameters<typeof sqliteTable>[2]
) => {
  // TODO: https://github.com/nextauthjs/next-auth/pull/8344
  // Replace when we will be able to pass custom db schemas to the adapter
  if (name === 'user') {
    return sqliteTable('user', {
      id: text('id').notNull().primaryKey(),
      name: text('name'),
      email: text('email').notNull(),
      emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
      aiEnabled: integer('ai_enabled', { mode: 'boolean' }).default(false),
      image: text('image')
    });
  }

  return sqliteTable(name, columns, extraConfig);
};

export { tableCreator };
