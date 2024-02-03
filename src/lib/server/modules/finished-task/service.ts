import { addDays, getDaysDiffTimestamp, isFutureTimestamp } from '$lib/date';
import type { DatabasePool } from '../../db/database';
import { updateTask } from '../task/queries';
import type { Task, TaskId } from '../task/model';
import type { FinishedTask } from './model';
import * as queries from './queries';

export async function getAllFinishedTasks(db: DatabasePool): Promise<FinishedTask[]> {
	return queries.getAllFinishedTasks(db);
}

export async function createFinishedTask(id: TaskId, db: DatabasePool): Promise<void> {
	const date = new Date();
	await queries.updateTaskResolutionDate(id, date, db);
}

export async function restoreFinishedTask(id: TaskId, db: DatabasePool): Promise<Task> {
	const { resolutionDate } = await queries.getFinishedTask(id, db);

	let task = await queries.restoreTask(id, db);
	if (task.dueDate && !isFutureTimestamp(task.dueDate)) {
		const daysDiff = getDaysDiffTimestamp(task.createdAt, resolutionDate);
		const dueDate = addDays(new Date(), daysDiff).getTime();
		task = await updateTask(id, { dueDate }, db);
	}
	return task;
}
