import type { DatabasePool } from '@repo/db';
import type { Task, TaskId } from './model';
import * as queries from './queries';
import { makeTaskRandomPrediction } from '../predicts/random-task';
import type { UserId } from '../user/model';

export async function getAllTasks(userId: UserId, db: DatabasePool): Promise<Task[]> {
  return queries.queryAllTasks(userId, db);
}

export async function deleteTaskById(
  userId: UserId,
  id: TaskId,
  db: DatabasePool
): Promise<TaskId> {
  return await queries.softDeleteTaskById(userId, id, db);
}

type CreateTaskInput = Omit<Task, 'id' | 'createdAt'>;

export async function createTask(
  userId: UserId,
  newTask: CreateTaskInput,
  db: DatabasePool
): Promise<Task> {
  const task: Task = {
    ...(await makeTaskRandomPrediction(newTask)),
    id: crypto.randomUUID(),
    createdAt: new Date().getTime()
  };
  return queries.createTask(userId, task, db);
}

type UpdateTaskInput = Omit<Task, 'id' | 'createdAt'>;

export async function updateTaskById(
  userId: UserId,
  id: TaskId,
  updatedTask: UpdateTaskInput,
  db: DatabasePool
): Promise<Task> {
  return queries.updateTask(userId, id, updatedTask, db);
}

export function restoreTaskById(userId: UserId, id: TaskId, db: DatabasePool): Promise<Task> {
  return queries.updateTask(userId, id, { deletedAt: null }, db);
}
