import { Task } from './model';
import { z } from 'zod';

export const TaskParam = Task.pick({ id: true });
export type TaskParam = z.infer<typeof TaskParam>;

export const TaskCreateInput = Task.omit({ id: true });
export type TaskCreateInput = z.infer<typeof TaskCreateInput>;

export const TaskCreateModel = Task.omit({ id: true });
export type TaskCreateModel = z.infer<typeof TaskCreateModel>;
