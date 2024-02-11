import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './auth';

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey().unique(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description', { mode: 'text' }),
  priority: text('priority', {
    enum: ['useless', 'low', 'medium', 'high']
  }),
  category: text('category', {
    enum: ['work', 'coding', 'reading', 'home', 'hobby', 'other']
  }),
  dueDate: integer('due_date'),
  resolutionDate: integer('resolution_date'),
  createdAt: integer('created_at').notNull(),
  deletedAt: integer('deleted_at')
});

export type TaskDataModel = Omit<typeof tasks.$inferSelect, 'resolutionDate'>;
export type FinishedTaskDataModel = typeof tasks.$inferSelect;
