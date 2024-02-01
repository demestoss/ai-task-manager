import { eq } from 'drizzle-orm';
import { type TaskDataModel, tasks } from '../../db/schema';
import type { DatabasePool } from '../../db/database';
import type { Task, TaskId } from './model';
import { DataError } from '../../errors/DataError';

export async function queryAllTasks(db: DatabasePool): Promise<Task[]> {
	const result = await db
		.select({
			id: tasks.id,
			name: tasks.name,
			description: tasks.description,
			priority: tasks.priority,
			category: tasks.category,
			dueDate: tasks.dueDate
		})
		.from(tasks)
		.all();

	return result.map(mapToDomainModel);
}

export async function deleteTaskById(id: TaskId, db: DatabasePool): Promise<void> {
	const result = await db.delete(tasks).where(eq(tasks.id, id)).returning({ id: tasks.id });

	if (result.length === 0) {
		throw new DataError('not-found', "Task doesn't exists");
	}
}

export async function createTask(task: Task, db: DatabasePool): Promise<Task> {
	const result = await db.insert(tasks).values(mapToDataModel(task)).returning({
		id: tasks.id,
		name: tasks.name,
		description: tasks.description,
		priority: tasks.priority,
		category: tasks.category,
		dueDate: tasks.dueDate
	});

	if (result.length === 0) {
		throw new DataError('creating-failed', 'Failed to create the task');
	}

	return mapToDomainModel(result[0]);
}

export async function updateTask(task: Task, db: DatabasePool): Promise<Task> {
	const result = await db
		.update(tasks)
		.set(mapToDataModel(task))
		.where(eq(tasks.id, task.id))
		.returning({
			id: tasks.id,
			name: tasks.name,
			description: tasks.description,
			priority: tasks.priority,
			category: tasks.category,
			dueDate: tasks.dueDate
		});

	if (result.length === 0) {
		throw new DataError('not-found', "Task doesn't exists");
	}

	return mapToDomainModel(result[0]);
}

function mapToDomainModel(task: TaskDataModel): Task {
	return {
		id: task.id,
		name: task.name,
		description: task.description ?? undefined,
		category: task.category ?? undefined,
		dueDate: task.dueDate ?? undefined,
		priority: task.priority ?? undefined
	};
}

function mapToDataModel(task: Task) {
	return {
		...task,
		dueDate: task.dueDate ?? null
	};
}
