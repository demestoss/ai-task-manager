import type { DatabasePool } from '$lib/server/db/database';
import type { TaskId } from '../task/model';
import type { FinishedTask } from './model';
import * as queries from './queries';

export async function getAllFinishedTasks(db: DatabasePool): Promise<FinishedTask[]> {
	return queries.getAllFinishedTasks(db);
}

export async function createFinishedTask(id: TaskId, db: DatabasePool): Promise<void> {
	const date = new Date();
	await queries.updateTodoResolutionDate(id, date, db);
}
