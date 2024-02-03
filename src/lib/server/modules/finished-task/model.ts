import { Task } from '../task/model';
import { z } from 'zod';

export const FinishedTask = z
	.object({
		resolutionDate: z.number()
	})
	.merge(Task);
export type FinishedTask = z.infer<typeof FinishedTask>;
