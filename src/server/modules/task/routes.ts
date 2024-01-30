import { Hono } from 'hono';
import { Task } from './model';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Responder } from '../../responder';
import { queryAllTasks, deleteTaskById, createTask } from './queries';

export const TaskParam = Task.pick({ id: true });
export type TaskParam = z.infer<typeof TaskParam>;

export const TaskCreateInput = Task.omit({ id: true });
export type TaskCreateInput = z.infer<typeof TaskCreateInput>;

export const taskRouter = new Hono();

taskRouter.get('/', async (c) => {
	const tasks = await queryAllTasks();
	return c.json<Task[]>(tasks);
});

taskRouter.post('/', zValidator('json', TaskCreateInput), async (c) => {
	const newTask = c.req.valid('json');
	const task = await createTask(newTask);
	return c.json<Task>(task);
});

taskRouter.delete('/:id', zValidator('param', TaskParam), async (c) => {
	const { id } = c.req.valid('param');
	await deleteTaskById(id);
	return c.json(Responder.success('Task removed successfully'));
});
