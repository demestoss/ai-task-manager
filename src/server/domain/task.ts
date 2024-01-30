import { z } from 'zod';

export const TaskPriority = z.enum([
	'useless', 'low', 'medium', 'high'
])
export type TaskPriority = z.infer<typeof TaskPriority>

export const Task = z.object({
	id: z.string().uuid(),
	name: z.string().min(1).max(127),
	description: z.string().min(1).max(2048).optional(),
	priority: TaskPriority,
	dueDate: z.date(),
	
})