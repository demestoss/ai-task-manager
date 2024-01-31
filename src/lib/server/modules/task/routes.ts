import { Hono } from 'hono';
import { Task } from './model';
import { zValidator } from '@hono/zod-validator';
import { Responder } from '../../responder';
import * as model from './service';
import * as ask from './ask';

export const taskRouter = new Hono()
	.get('/', async (c) => {
		const tasks = await model.getAllTasks();
		return c.json<Task[]>(tasks);
	})
	.post('/', zValidator('json', ask.TaskCreateInput), async (c) => {
		const newTask = c.req.valid('json');
		const task = await model.createTask(newTask);
		return c.json<Task>(task);
	})
	.put(
		'/:id',
		zValidator('param', ask.TaskParam),
		zValidator('json', ask.TaskCreateInput),
		async (c) => {
			const { id } = c.req.valid('param');
			const updatedTask = c.req.valid('json');
			const task = await model.updateTaskById(id, updatedTask);
			return c.json<Task>(task);
		}
	)
	.delete('/:id', zValidator('param', ask.TaskParam), async (c) => {
		const { id } = c.req.valid('param');
		await model.deleteTaskById(id);
		return c.json(Responder.success('Task removed successfully'), 201);
	});
