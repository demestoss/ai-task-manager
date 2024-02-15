import { Task, type TaskCategory, type TaskDescriptionType } from '@repo/domain/task';
import { z } from 'zod';

export interface TaskInput extends Partial<Task> {
  name: string;
  descriptionType?: TaskDescriptionType;
  category?: TaskCategory | null;
}

export const TaskPrediction = Task.omit({ id: true, createdAt: true });
export type TaskPrediction = z.infer<typeof TaskPrediction>;

export interface AiModule {
  makeTaskPrediction(taskInput: TaskInput): Promise<TaskPrediction>;
  remakeTaskPrediction(task: Task, prompt: string): Promise<TaskPrediction>;
}
