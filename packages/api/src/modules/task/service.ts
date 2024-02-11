import type { DatabasePool } from '@repo/db';
import { Task, type TaskId } from '@repo/domain/task';
import * as queries from './queries';
import type { UserId } from '@repo/domain/user';
import type { AiModule } from '@repo/ai';

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
  ai: AiModule,
  db: DatabasePool
): Promise<Task> {
  const taskPrediction = await ai.makeTaskPrediction(newTask, Task);

  const task: Task = {
    ...taskPrediction,
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
