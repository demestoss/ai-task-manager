import type { AnyZodObject } from 'zod';
import type { AiModule, TaskInput, TaskPrediction } from '../ai-module';
import { makeTaskDummyPrediction } from './task';

export class DummyAiModule implements AiModule {
  makeTaskPrediction<TSchema extends AnyZodObject>(
    taskInput: TaskInput,
    taskSchema: TSchema
  ): Promise<TaskPrediction<TSchema>> {
    return makeTaskDummyPrediction(taskInput);
  }
}
