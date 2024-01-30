import type { Task, TaskId } from './model';
import { DataError } from '../../error/DataError';

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

type CreateTaskInput = Omit<Task, 'id'>;

export async function createTask(newTask: CreateTaskInput) {
	const id = crypto.randomUUID();
	const task = { ...newTask, id };
	tasks.push(task);
	return task;
}
