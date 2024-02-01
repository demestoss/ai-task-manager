import { integer, text } from 'drizzle-orm/sqlite-core';
import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	description: text('description'),
	priorityId: integer('priority_id').references(() => priorities.id),
	dueDate: integer('due_date'),
	resolutionDate: integer('resolution_date'),
	categoryId: integer('category_id').references(() => categories.id)
});

export const priorities = sqliteTable('priorities', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description')
});

export const categories = sqliteTable('categories', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description')
});
