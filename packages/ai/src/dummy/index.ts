import type { AiModule, TaskInput, TaskPrediction } from '../ai-module';
import { makeTaskDummyPrediction } from './task';
import type { Task } from '@repo/domain/task';

export class DummyAiModule implements AiModule {
  makeTaskPrediction(taskInput: TaskInput): Promise<TaskPrediction> {
    return makeTaskDummyPrediction(taskInput);
  }

  remakeTaskPrediction(task: Task, prompt: string): Promise<TaskPrediction> {
    return makeTaskDummyPrediction({
      ...task,
      description: task.description + prompt
    });
  }
}
