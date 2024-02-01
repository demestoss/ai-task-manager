import { integer, text } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	description: text('description'),
	priority: text('priority', {
		enum: ['useless', 'low', 'medium', 'high']
	}),
	dueDate: integer('due_date'),
	resolutionDate: integer('resolution_date'),
	category: text('category', {
		enum: ['work', 'coding', 'reading', 'home', 'hobby', 'other']
	})
});

export type TaskDataModel = Omit<typeof tasks.$inferSelect, 'resolutionDate'>
export type FinishedTaskDataModel = typeof tasks.$inferSelect
