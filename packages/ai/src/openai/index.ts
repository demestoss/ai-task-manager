import OpenAI from 'openai';
import type { AnyZodObject } from 'zod';
import type { AiModule, TaskInput, TaskPrediction } from '../ai-module';

export class OpenAIModule implements AiModule {
  private readonly #openai: OpenAI;

  constructor(secretKey: string) {
    this.#openai = new OpenAI({ apiKey: secretKey });
  }

  async makeTaskPrediction<TSchema extends AnyZodObject>(
    { name }: TaskInput,
    taskSchema: TSchema
  ): Promise<TaskPrediction<TSchema>> {
    return { name };
  }
}
