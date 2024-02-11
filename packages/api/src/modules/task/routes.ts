import type { HonoContext } from '../../context';
import { Hono } from 'hono';
import { Task } from './model';
import { zValidator } from '@hono/zod-validator';
import { Responder } from '../../responder';
import * as model from './service';
import * as ask from './ask';
import { createFinishedTask } from '../finished-task/service';

export const taskRouter = new Hono<HonoContext>()
  .get('/', async (c) => {
    const db = c.get('db');
    const userId = c.get('session').user.id;
    const tasks = await model.getAllTasks(userId, db);
    return c.json<Task[]>(tasks);
  })
  .post('/', zValidator('json', ask.TaskCreateInput), async (c) => {
    const newTask = c.req.valid('json');
    const db = c.get('db');
    const ai = c.get('ai');
    const userId = c.get('session').user.id;
    const task = await model.createTask(userId, newTask, ai, db);
    return c.json<Task>(task);
  })
  .patch(
    '/:id',
    zValidator('param', ask.TaskParam),
    zValidator('json', ask.TaskCreateInput),
    async (c) => {
      const { id } = c.req.valid('param');
      const updatedTask = c.req.valid('json');
      const db = c.get('db');
      const userId = c.get('session').user.id;
      const task = await model.updateTaskById(userId, id, updatedTask, db);
      return c.json<Task>(task);
    }
  )
  .delete('/:id', zValidator('param', ask.TaskParam), async (c) => {
    const { id } = c.req.valid('param');
    const db = c.get('db');
    const userId = c.get('session').user.id;
    await model.deleteTaskById(userId, id, db);
    return c.json(Responder.success('Task removed successfully'), 201);
  })
  .post(':id/restore', zValidator('param', ask.TaskParam), async (c) => {
    const { id } = c.req.valid('param');
    const db = c.get('db');
    const userId = c.get('session').user.id;
    await model.restoreTaskById(userId, id, db);
    return c.json(Responder.success('Task was successfully restored'), 201);
  })
  .post(':id/finish', zValidator('param', ask.TaskParam), async (c) => {
    const { id } = c.req.valid('param');
    const db = c.get('db');
    const userId = c.get('session').user.id;
    await createFinishedTask(userId, id, db);
    return c.json(Responder.success('Task successfully marked as finished'), 201);
  });
