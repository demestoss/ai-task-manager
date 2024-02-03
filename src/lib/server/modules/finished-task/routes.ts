import type { RouterContext } from '$lib/server/context';
import { TaskParam } from '$lib/server/modules/task/ask';
import type { Task } from '$lib/server/modules/task/model';
import { zValidator } from '@hono/zod-validator';
import type { FinishedTask, FinishedTaskGroup } from './model';
import * as model from './service';
import { Hono } from 'hono';

export const finishedTasksRouter = new Hono<{ Variables: RouterContext }>()
	.get('/', async (c) => {
		const db = c.get('db');
		const finishedTasks = await model.getAllFinishedTasks(db);
		return c.json<FinishedTask[]>(finishedTasks);
	})
	.get('/grouped', async (c) => {
		const db = c.get('db');
		const finishedTasks = await model.getAllGroupedFinishedTasks(db);
		return c.json<FinishedTaskGroup[]>(finishedTasks);
	})
	.post('/:id/return', zValidator('param', TaskParam), async (c) => {
		const db = c.get('db');
		const { id } = c.req.valid('param');
		const restoredTask = await model.restoreFinishedTask(id, db);
		return c.json<Task>(restoredTask);
	});
