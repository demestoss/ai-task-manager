import { type TaskDataModel, schema, and, eq, isNull } from '@repo/db';
import type { DatabasePool } from '@repo/db';
import { Task, type TaskId } from '@repo/domain/task';
import { DataError } from '../../errors/DataError';
import type { UserId } from '@repo/domain/user';

const { tasks } = schema;

export async function queryAllTasks(userId: UserId, db: DatabasePool): Promise<Task[]> {
  try {
    const result = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.userId, userId), isNull(tasks.resolutionDate), isNull(tasks.deletedAt)))
      .all();

    return result.map(mapTaskToDomainModel);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteTaskById(userId: UserId, id: TaskId, db: DatabasePool): Promise<void> {
  const result = await db
    .delete(tasks)
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)))
    .returning({ id: tasks.id });

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }
}

export async function softDeleteTaskById(
  userId: UserId,
  id: TaskId,
  db: DatabasePool
): Promise<TaskId> {
  const result = await db
    .update(tasks)
    .set({ deletedAt: new Date().getTime() })
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)))
    .returning({ id: tasks.id });

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }

  return result[0].id;
}

export async function createTask(userId: UserId, task: Task, db: DatabasePool): Promise<Task> {
  const result = await db
    .insert(tasks)
    .values({ ...task, userId })
    .returning({
      id: tasks.id,
      name: tasks.name,
      description: tasks.description,
      priority: tasks.priority,
      category: tasks.category,
      dueDate: tasks.dueDate,
      createdAt: tasks.createdAt
    });

  if (result.length === 0) {
    throw new DataError('creating-failed', 'Failed to create the task');
  }

  return mapTaskToDomainModel(result[0]);
}

export type TaskUpdateInput = Partial<TaskDataModel>;

export async function updateTask(
  userId: UserId,
  id: TaskId,
  taskInput: TaskUpdateInput,
  db: DatabasePool
): Promise<Task> {
  const result = await db
    .update(tasks)
    .set({ ...taskInput })
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)))
    .returning({
      id: tasks.id,
      name: tasks.name,
      description: tasks.description,
      priority: tasks.priority,
      category: tasks.category,
      dueDate: tasks.dueDate,
      createdAt: tasks.createdAt
    });

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }

  return mapTaskToDomainModel(result[0]);
}

export function mapTaskToDomainModel(task: Omit<TaskDataModel, 'deletedAt' | 'userId'>): Task {
  return {
    id: task.id,
    name: task.name,
    description: task.description ?? undefined,
    category: task.category ?? undefined,
    dueDate: task.dueDate ?? undefined,
    priority: task.priority ?? undefined,
    createdAt: task.createdAt
  };
}
