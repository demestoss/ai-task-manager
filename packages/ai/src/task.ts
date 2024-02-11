import { type AnyZodObject } from 'zod';
import type { AiModule } from './ai-module';

interface TaskInput {
  name: string;
}

export async function makeTaskPrediction<TSchema extends AnyZodObject>(
  { name }: TaskInput,
  taskSchema: TSchema,
  ai: AiModule
): Promise<TSchema> {}
