import type { DatabasePool } from '@repo/db';
import { schema, and, desc, eq, isNotNull, isNull } from '@repo/db';
import { DataError } from '../../errors/DataError';
import type { UserId } from '@repo/domain/user';
import type { FinishedTask } from '@repo/domain/finished-task';
import type { Task, TaskId } from '@repo/domain/task';
import type { PaginationParams } from '../pagination';

const { tasks } = schema;

export async function getAllFinishedTasks(
  userId: UserId,
  { limit, offset }: PaginationParams,
  db: DatabasePool
): Promise<FinishedTask[]> {
  const result = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, userId), isNotNull(tasks.resolutionDate), isNull(tasks.deletedAt)))
    .orderBy(desc(tasks.resolutionDate))
    .limit(limit)
    .offset(offset);

  return result as FinishedTask[];
}

export async function getFinishedTask(
  userId: UserId,
  id: TaskId,
  db: DatabasePool
): Promise<FinishedTask> {
  const result = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)))
    .limit(1);

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }

  return result[0] as FinishedTask;
}

export async function updateTaskResolutionDate(
  userId: UserId,
  id: TaskId,
  date: Date,
  db: DatabasePool
): Promise<void> {
  const result = await db
    .update(tasks)
    .set({ resolutionDate: date.getTime() })
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)))
    .returning({ id: tasks.id });

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }
}

export async function restoreTask(userId: UserId, id: TaskId, db: DatabasePool): Promise<Task> {
  const result = await db
    .update(tasks)
    .set({ resolutionDate: null })
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)))
    .returning();

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }

  return result[0];
}
