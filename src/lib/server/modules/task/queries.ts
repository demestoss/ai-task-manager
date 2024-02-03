import { eq, isNull } from 'drizzle-orm';
import { z } from 'zod';
import { type TaskDataModel, tasks } from '../../db/schema';
import type { DatabasePool } from '../../db/database';
import { Task, type TaskId } from './model';
import { DataError } from '../../errors/DataError';

export async function queryAllTasks(db: DatabasePool): Promise<Task[]> {
	const result = await db
		.select({
			id: tasks.id,
			name: tasks.name,
			description: tasks.description,
			priority: tasks.priority,
			category: tasks.category,
			dueDate: tasks.dueDate,
			createdAt: tasks.createdAt
		})
		.from(tasks)
		.where(isNull(tasks.resolutionDate));

	return result.map(mapTaskToDomainModel);
}

export async function deleteTaskById(id: TaskId, db: DatabasePool): Promise<void> {
	const result = await db.delete(tasks).where(eq(tasks.id, id)).returning({ id: tasks.id });

	if (result.length === 0) {
		throw new DataError('not-found', "Task doesn't exists");
	}
}

export async function createTask(task: Task, db: DatabasePool): Promise<Task> {
	const result = await db
		.insert(tasks)
		.values({ ...task })
		.returning({
			id: tasks.id,
			name: tasks.name,
			description: tasks.description,
			priority: tasks.priority,
			category: tasks.category,
			dueDate: tasks.dueDate,
			createdAt: tasks.createdAt
		});

	if (result.length === 0) {
		throw new DataError('creating-failed', 'Failed to create the task');
	}

	return mapTaskToDomainModel(result[0]);
}

export const TaskUpdateInput = Task.omit({ id: true, createdAt: true });
export type TaskUpdateInput = Partial<z.infer<typeof TaskUpdateInput>>;

export async function updateTask(
	id: TaskId,
	taskInput: TaskUpdateInput,
	db: DatabasePool
): Promise<Task> {
	const result = await db
		.update(tasks)
		.set({ ...taskInput })
		.where(eq(tasks.id, id))
		.returning({
			id: tasks.id,
			name: tasks.name,
			description: tasks.description,
			priority: tasks.priority,
			category: tasks.category,
			dueDate: tasks.dueDate,
			createdAt: tasks.createdAt
		});

	if (result.length === 0) {
		throw new DataError('not-found', "Task doesn't exists");
	}

	return mapTaskToDomainModel(result[0]);
}

export function mapTaskToDomainModel(task: TaskDataModel): Task {
	return {
		id: task.id,
		name: task.name,
		description: task.description ?? undefined,
		category: task.category ?? undefined,
		dueDate: task.dueDate ?? undefined,
		priority: task.priority ?? undefined,
		createdAt: task.createdAt
	};
}
