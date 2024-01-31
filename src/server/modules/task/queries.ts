import type { Task, TaskId } from './model';
import { DataError } from '../../errors/DataError';

const tasks: Task[] = [];

export async function queryAllTasks() {
	return tasks;
}

export async function deleteTaskById(id: TaskId): Promise<void> {
	const index = tasks.findIndex((t) => t.id === id);

	if (index === -1) {
		throw new DataError('not-found', "Task doesn't exists");
	}

	tasks.splice(index, 1);
}

export async function createTask(task: Task) {
	tasks.push(task);
	return task;
}

export async function updateTask(task: Task) {
	const index = tasks.findIndex((t) => t.id === task.id);

	if (index === -1) {
		throw new DataError('not-found', "Task doesn't exists");
	}

	tasks.splice(index, 1, task);
	return task;
}
