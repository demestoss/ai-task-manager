import OpenAI from 'openai';
import { type AiModule, type TaskInput, TaskPrediction } from '../ai-module';
import { getTaskPrompt } from './task';

export class OpenAIModule implements AiModule {
  readonly #openai: OpenAI;

  constructor(secretKey: string) {
    this.#openai = new OpenAI({ apiKey: secretKey });
  }

  async makeTaskPrediction({ name }: TaskInput): Promise<TaskPrediction> {
    const chat = await this.#openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: getTaskPrompt(name)
        }
      ]
    });

    const response = chat?.choices?.[0]?.message?.content;

    try {
      const gptPrediction = JSON.parse(response ?? '{}');
      return TaskPrediction.parse(gptPrediction);
    } catch (e) {
      throw new Error(`Failed to parse gpr prediction. Response is: ${response}`);
    }
  }
}
