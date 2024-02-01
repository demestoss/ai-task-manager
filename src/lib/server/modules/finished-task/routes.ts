import type { FinishedTask } from './model';
import { getAllFinishedTasks } from './queries';
import { Hono } from 'hono';

export const finishedTasksRouter = new Hono().get('/', async (c) => {
	const finishedTasks = await getAllFinishedTasks();
	return c.json<FinishedTask[]>(finishedTasks);
});
