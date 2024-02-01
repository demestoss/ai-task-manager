import type { DatabasePool } from '$lib/server/db/database';
import { type FinishedTaskDataModel, tasks } from '$lib/server/db/schema';
import { DataError } from '$lib/server/errors/DataError';
import { eq, isNotNull } from 'drizzle-orm';
import type { FinishedTask } from './model';
import type { TaskId } from '../task/model';

export async function getAllFinishedTasks(db: DatabasePool): Promise<FinishedTask[]> {
	const result = await db.select().from(tasks).where(isNotNull(tasks.resolutionDate)).all();

	return result.map(mapToDomainModel);
}

export async function updateTodoResolutionDate(
	id: TaskId,
	date: Date,
	db: DatabasePool
): Promise<void> {
	const result = await db
		.update(tasks)
		.set({ resolutionDate: date.getTime() })
		.where(eq(tasks.id, id))
		.returning({ id: tasks.id });

	if (result.length === 0) {
		throw new DataError('not-found', "Task doesn't exists");
	}
}

function mapToDomainModel(task: FinishedTaskDataModel): FinishedTask {
	return {
		id: task.id,
		name: task.name,
		description: task.description ?? undefined,
		category: task.category ?? undefined,
		dueDate: task.dueDate ?? undefined,
		priority: task.priority ?? undefined,
		resolutionDate: task.resolutionDate!
	};
}
