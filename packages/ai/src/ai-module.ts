import type { AnyZodObject, z } from 'zod';

export interface TaskInput {
  name: string;
  category?: string;
}

export type TaskPrediction<TSchema extends AnyZodObject> = z.input<TSchema>;

// TODO: Instead of passing schema, make domain module
export interface AiModule {
  makeTaskPrediction<TSchema extends AnyZodObject>(
    taskInput: TaskInput,
    taskSchema: TSchema
  ): Promise<TaskPrediction<TSchema>>;
}
