import type { Task, TaskId } from './model';
import * as queries from './queries';
import { makeTaskPrediction } from '$lib/server/modules/predicts/task';

export async function getAllTasks(): Promise<Task[]> {
	return queries.queryAllTasks();
}

export async function deleteTaskById(id: TaskId): Promise<void> {
	await queries.deleteTaskById(id);
}

type CreateTaskInput = Omit<Task, 'id'>;

export async function createTask(newTask: CreateTaskInput): Promise<Task> {
	const task: Task = {
		...(await makeTaskPrediction(newTask)),
		id: crypto.randomUUID()
	};
	return queries.createTask(task);
}

type UpdateTaskInput = Omit<Task, 'id'>;

export async function updateTaskById(id: TaskId, updatedTask: UpdateTaskInput): Promise<Task> {
	return queries.updateTask({ id, ...updatedTask });
}
