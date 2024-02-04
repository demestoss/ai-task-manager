import type { DatabasePool } from '@repo/db';
import type { Task, TaskId } from './model';
import * as queries from './queries';
import { makeTaskRandomPrediction } from '../predicts/random-task';

export async function getAllTasks(db: DatabasePool): Promise<Task[]> {
	return queries.queryAllTasks(db);
}

export async function deleteTaskById(id: TaskId, db: DatabasePool): Promise<TaskId> {
	return await queries.softDeleteTaskById(id, db);
}

type CreateTaskInput = Omit<Task, 'id' | 'createdAt'>;

export async function createTask(newTask: CreateTaskInput, db: DatabasePool): Promise<Task> {
	const task: Task = {
		...(await makeTaskRandomPrediction(newTask)),
		id: crypto.randomUUID(),
		createdAt: new Date().getTime()
	};
	return queries.createTask(task, db);
}

type UpdateTaskInput = Omit<Task, 'id' | 'createdAt'>;

export async function updateTaskById(
	id: TaskId,
	updatedTask: UpdateTaskInput,
	db: DatabasePool
): Promise<Task> {
	return queries.updateTask(id, updatedTask, db);
}

export function restoreTaskById(id: TaskId, db: DatabasePool): Promise<Task> {
	return queries.updateTask(id, { deletedAt: null }, db);
}
