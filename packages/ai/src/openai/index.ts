import OpenAI from 'openai';
import type { AiModule, TaskInput, TaskPrediction } from '../ai-module';

export class OpenAIModule implements AiModule {
  private readonly #openai: OpenAI;

  constructor(secretKey: string) {
    this.#openai = new OpenAI({ apiKey: secretKey });
  }

  async makeTaskPrediction({ name }: TaskInput): Promise<TaskPrediction> {
    return { name };
  }
}
