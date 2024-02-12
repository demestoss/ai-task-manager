import {
  formatTimestamp,
  getDaysDiffTimestamp,
  isFutureTimestamp
} from '@repo/date-utils/timestamp';
import type { DatabasePool } from '@repo/db';
import { updateTask } from '../task/queries';
import * as queries from './queries';
import type { UserId } from '@repo/domain/user';
import type { FinishedTask, FinishedTaskGroup } from '@repo/domain/finished-task';
import type { Task, TaskId } from '@repo/domain/task';
import { addDays } from '@repo/date-utils';
import type { PaginationParams } from '../pagination';

export async function getAllFinishedTasks(
  userId: UserId,
  pagination: PaginationParams,
  db: DatabasePool
): Promise<FinishedTask[]> {
  return queries.getAllFinishedTasks(userId, pagination, db);
}

export async function getAllGroupedFinishedTasks(
  userId: UserId,
  pagination: PaginationParams,
  db: DatabasePool
): Promise<FinishedTaskGroup[]> {
  const tasks = await queries.getAllFinishedTasks(userId, pagination, db);

  return Object.entries(
    tasks.reduce(
      (acc, task) => {
        const date = formatTimestamp(task.resolutionDate, 'MM-DD-YYYY');
        acc[date] ??= [];
        acc[date].push(task);
        return acc;
      },
      {} as Record<string, FinishedTask[]>
    )
  ).map(([date, list]) => ({ date, list }));
}

export async function createFinishedTask(
  userId: UserId,
  id: TaskId,
  db: DatabasePool
): Promise<void> {
  const date = new Date();
  await queries.updateTaskResolutionDate(userId, id, date, db);
}

export async function restoreFinishedTask(
  userId: UserId,
  id: TaskId,
  db: DatabasePool
): Promise<Task> {
  const { resolutionDate } = await queries.getFinishedTask(userId, id, db);

  let task = await queries.restoreTask(userId, id, db);
  if (task.dueDate && !isFutureTimestamp(task.dueDate)) {
    const daysDiff = getDaysDiffTimestamp(task.createdAt, resolutionDate);
    const dueDate = addDays(new Date(), daysDiff).getTime();
    task = await updateTask(userId, id, { dueDate }, db);
  }
  return task;
}
