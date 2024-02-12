import { Task, type TaskCategory } from '@repo/domain/task';
import { z } from 'zod';

export interface TaskInput {
  name: string;
  category?: TaskCategory | null;
}

export const TaskPrediction = Task.omit({ id: true, createdAt: true });
export type TaskPrediction = z.infer<typeof TaskPrediction>;

export interface AiModule {
  makeTaskPrediction(taskInput: TaskInput): Promise<TaskPrediction>;
}
