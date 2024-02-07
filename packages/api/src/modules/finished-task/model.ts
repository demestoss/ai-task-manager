import { Task } from '../task/model';
import { z } from 'zod';

export const FinishedTask = Task.merge(
  z.object({
    resolutionDate: z.number()
  })
);
export type FinishedTask = z.infer<typeof FinishedTask>;

export type FinishedTaskGroup = {
  date: string;
  list: FinishedTask[];
};
