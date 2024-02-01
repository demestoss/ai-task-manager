import type { RouterContext } from '$lib/server/context';
import type { FinishedTask } from './model';
import { getAllFinishedTasks } from './service';
import { Hono } from 'hono';

export const finishedTasksRouter = new Hono<{ Variables: RouterContext }>().get('/', async (c) => {
	const db = c.get('db');
	const finishedTasks = await getAllFinishedTasks(db);
	return c.json<FinishedTask[]>(finishedTasks);
});
