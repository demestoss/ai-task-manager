import { z } from 'zod';

export const TaskId = z.string().uuid();
export type TaskId = z.infer<typeof TaskId>;

export const TaskPriority = z.enum(['useless', 'low', 'medium', 'high']);
export type TaskPriority = z.infer<typeof TaskPriority>;

export const TaskCategory = z.enum(['work', 'coding', 'reading', 'home', 'hobby', 'other']);
export type TaskCategory = z.infer<typeof TaskCategory>;

export const Task = z.object({
	id: TaskId,
	name: z.string().min(1).max(127),
	description: z.string().min(1).max(2048).optional(),
	priority: TaskPriority.optional(),
	dueDate: z.date().optional(),
	category: TaskCategory.optional()
});
export type Task = z.infer<typeof Task>;

export const DueType = z.enum(['not-due', 'close-to-due', 'due-date', 'over-due']);
export type DueType = z.infer<typeof DueType>;

export const TaskViewModel = z
	.object({
		dueType: DueType.optional()
	})
	.merge(Task);
export type TaskViewModel = z.infer<typeof TaskViewModel>;
