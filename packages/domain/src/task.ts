import { z } from 'zod';

export const TaskId = z.string().uuid();
export type TaskId = z.infer<typeof TaskId>;

export const TaskPriority = z.enum(['useless', 'low', 'medium', 'high']);
export type TaskPriority = z.infer<typeof TaskPriority>;

export const TaskCategory = z.enum(['work', 'coding', 'reading', 'home', 'hobby', 'other']);
export type TaskCategory = z.infer<typeof TaskCategory>;

export const TaskDescriptionType = z.enum(['short', 'long', 'none']);
export type TaskDescriptionType = z.infer<typeof TaskDescriptionType>;

export const TaskName = z.string().min(1).max(127);
export type TaskName = z.infer<typeof TaskName>;

export const Task = z.object({
  id: TaskId,
  name: TaskName,
  description: z.string().min(1).max(2048).nullish(),
  priority: TaskPriority.nullish(),
  category: TaskCategory.nullish(),
  dueDate: z.number().nullish(),
  createdAt: z.number()
});
export type Task = z.infer<typeof Task>;

export const DueType = z.enum(['not-due', 'close-to-due', 'due-date', 'over-due']);
export type DueType = z.infer<typeof DueType>;

export const TaskViewModel = Task.merge(
  z.object({
    dueType: DueType.optional()
  })
);
export type TaskViewModel = z.infer<typeof TaskViewModel>;
