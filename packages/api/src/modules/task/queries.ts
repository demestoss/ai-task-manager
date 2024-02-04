import { and, eq, isNull } from 'drizzle-orm';
import { type TaskDataModel, tasks } from '@repo/db';
import type { DatabasePool } from '@repo/db';
import { Task, type TaskId } from './model';
import { DataError } from '../../errors/DataError';

export async function queryAllTasks(db: DatabasePool): Promise<Task[]> {
  try {
    const result = await db
      .select()
      .from(tasks)
      .where(and(isNull(tasks.resolutionDate), isNull(tasks.deletedAt)))
      .all();

    return result.map(mapTaskToDomainModel);
  } catch (error) {
    console.log(error);
    return []
  }
}

export async function deleteTaskById(id: TaskId, db: DatabasePool): Promise<void> {
  const result = await db.delete(tasks).where(eq(tasks.id, id)).returning({ id: tasks.id });

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }
}

export async function softDeleteTaskById(id: TaskId, db: DatabasePool): Promise<TaskId> {
  const result = await db
    .update(tasks)
    .set({ deletedAt: new Date().getTime() })
    .where(eq(tasks.id, id))
    .returning({ id: tasks.id });

  if (result.length === 0) {
    throw new DataError('not-found', "Task doesn't exists");
  }

  return result[0].id;
}

export async function createTask(task: Task, db: DatabasePool): Promise<Task> {
  const result = await db
    .insert(tasks)
    .values({ ...task })
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
  id: TaskId,
  taskInput: TaskUpdateInput,
  db: DatabasePool
): Promise<Task> {
  const result = await db
    .update(tasks)
    .set({ ...taskInput })
    .where(eq(tasks.id, id))
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

export function mapTaskToDomainModel(task: Omit<TaskDataModel, 'deletedAt'>): Task {
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
