import { sql } from 'drizzle-orm';
import { integer, text } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	description: text('description'),
	priority: text('priority', {
		enum: ['useless', 'low', 'medium', 'high']
	}),
	category: text('category', {
		enum: ['work', 'coding', 'reading', 'home', 'hobby', 'other']
	}),
	dueDate: integer('due_date', { mode: 'timestamp_ms' }),
	resolutionDate: integer('resolution_date', { mode: 'timestamp_ms' }),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(unixepoch('subsecond') * 1000)`)
		.notNull()
});

export type TaskDataModel = Omit<typeof tasks.$inferSelect, 'resolutionDate'>;
export type FinishedTaskDataModel = typeof tasks.$inferSelect;
