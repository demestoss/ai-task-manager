import type { RouterContext } from '../../context';
import { TaskParam } from '../task/ask';
import { zValidator } from '@hono/zod-validator';
import * as model from './service';
import { Hono } from 'hono';
import type { FinishedTask, FinishedTaskGroup } from '@repo/domain/finished-task';
import type { Task } from '@repo/domain/task';

export const finishedTasksRouter = new Hono<{ Variables: RouterContext }>()
  .get('/', async (c) => {
    const db = c.get('db');
    const userId = c.get('session').user.id;
    const finishedTasks = await model.getAllFinishedTasks(userId, db);
    return c.json<FinishedTask[]>(finishedTasks);
  })
  .get('/grouped', async (c) => {
    const db = c.get('db');
    const userId = c.get('session').user.id;
    const finishedTasks = await model.getAllGroupedFinishedTasks(userId, db);
    return c.json<FinishedTaskGroup[]>(finishedTasks);
  })
  .post('/:id/return', zValidator('param', TaskParam), async (c) => {
    const db = c.get('db');
    const userId = c.get('session').user.id;
    const { id } = c.req.valid('param');
    const restoredTask = await model.restoreFinishedTask(userId, id, db);
    return c.json<Task>(restoredTask);
  });
