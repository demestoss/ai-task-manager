import { Task, TaskDescriptionType, TaskName } from '@repo/domain/task';
import { z } from 'zod';

export const TaskParam = Task.pick({ id: true });
export type TaskParam = z.infer<typeof TaskParam>;

export const TaskCreateInput = z.object({
  name: TaskName,
  descriptionType: TaskDescriptionType
});
export type TaskCreateInput = z.infer<typeof TaskCreateInput>;

export const UpdateTaskInput = z.object({
  prompt: TaskName,
});
export type UpdateTaskInput = z.infer<typeof UpdateTaskInput>;


export const TaskCreateModel = Task.omit({ id: true, createdAt: true });
export type TaskCreateModel = z.infer<typeof TaskCreateModel>;
