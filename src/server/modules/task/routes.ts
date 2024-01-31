import { Hono } from 'hono';
import { Task } from './model';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Responder } from '../../responder';
import * as model from './service';

export const TaskParam = Task.pick({ id: true });
export type TaskParam = z.infer<typeof TaskParam>;

export const TaskCreateInput = Task.omit({ id: true });
export type TaskCreateInput = z.infer<typeof TaskCreateInput>;

export const taskRouter = new Hono()
	.get('/', async (c) => {
		const tasks = await model.getAllTasks();
		return c.json<Task[]>(tasks);
	})
	.post('/', zValidator('json', TaskCreateInput), async (c) => {
		const newTask = c.req.valid('json');
		const task = await model.createTask(newTask);
		return c.json<Task>(task);
	})
	.put('/:id', zValidator('param', TaskParam), zValidator('json', TaskCreateInput), async (c) => {
		const { id } = c.req.valid('param');
		const updatedTask = c.req.valid('json');
		const task = await model.updateTaskById(id, updatedTask);
		return c.json<Task>(task);
	})
	.delete('/:id', zValidator('param', TaskParam), async (c) => {
		const { id } = c.req.valid('param');
		await model.deleteTaskById(id);
		return c.json(Responder.success('Task removed successfully'), 201);
	});
