import type { AiModule, TaskInput, TaskPrediction } from '../ai-module';
import { makeTaskDummyPrediction } from './task';

export class DummyAiModule implements AiModule {
  makeTaskPrediction(taskInput: TaskInput): Promise<TaskPrediction> {
    return makeTaskDummyPrediction(taskInput);
  }
}
