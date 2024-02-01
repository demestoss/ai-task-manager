import type { TaskId } from '../task/model';
import type { FinishedTask } from './model';
import * as queries from './queries';

export async function getAllFinishedTasks(): Promise<FinishedTask[]> {
	return queries.getAllFinishedTasks();
}

export async function createFinishedTask(id: TaskId) {
	const date = new Date();
	await queries.updateTodoResolutionDate(id, date);
}
