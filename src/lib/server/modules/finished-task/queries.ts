import type { FinishedTask } from './model';
import type { TaskId } from '../task/model';

export async function updateTodoResolutionDate(id: TaskId, date: Date) {}

export async function getAllFinishedTasks(): Promise<FinishedTask[]> {}
