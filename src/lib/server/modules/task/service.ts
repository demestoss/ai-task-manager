import type { DatabasePool } from '$lib/server/db/database';
import type { Task, TaskId } from './model';
import * as queries from './queries';
import { makeTaskPrediction } from '../predicts/task';

export async function getAllTasks(db: DatabasePool): Promise<Task[]> {
	return queries.queryAllTasks(db);
}

export async function deleteTaskById(id: TaskId, db: DatabasePool): Promise<void> {
	await queries.deleteTaskById(id, db);
}

type CreateTaskInput = Omit<Task, 'id'>;

export async function createTask(newTask: CreateTaskInput, db: DatabasePool): Promise<Task> {
	const task: Task = {
		...(await makeTaskPrediction(newTask)),
		id: crypto.randomUUID()
	};
	return queries.createTask(task, db);
}

type UpdateTaskInput = Omit<Task, 'id'>;

export async function updateTaskById(
	id: TaskId,
	updatedTask: UpdateTaskInput,
	db: DatabasePool
): Promise<Task> {
	return queries.updateTask(id, updatedTask, db);
}
