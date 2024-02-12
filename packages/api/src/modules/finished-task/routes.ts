import type { HonoContext } from '../../context';
import { TaskParam } from '../task/ask';
import { zValidator } from '@hono/zod-validator';
import * as model from './service';
import { Hono } from 'hono';
import type { FinishedTask, FinishedTaskGroup } from '@repo/domain/finished-task';
import type { Task } from '@repo/domain/task';
import { QueryPaginationParams } from '../pagination';

export const finishedTasksRouter = new Hono<HonoContext>()
  .get('/', zValidator('query', QueryPaginationParams), async (c) => {
    const db = c.get('db');
    const userId = c.get('session').user.id;
    const query = c.req.valid('query');
    const finishedTasks = await model.getAllFinishedTasks(userId, query, db);
    return c.json<FinishedTask[]>(finishedTasks);
  })
  .get(
    '/grouped',
    zValidator('query', QueryPaginationParams),
    zValidator('param', TaskParam),
    async (c) => {
      const db = c.get('db');
      const userId = c.get('session').user.id;
      const query = c.req.valid('query');
      const finishedTasks = await model.getAllGroupedFinishedTasks(userId, query, db);
      return c.json<FinishedTaskGroup[]>(finishedTasks);
    }
  )
  .post('/:id/return', zValidator('param', TaskParam), async (c) => {
    const db = c.get('db');
    const userId = c.get('session').user.id;
    const { id } = c.req.valid('param');
    const restoredTask = await model.restoreFinishedTask(userId, id, db);
    return c.json<Task>(restoredTask);
  });
