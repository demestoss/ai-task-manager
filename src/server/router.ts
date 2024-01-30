import { Hono } from 'hono'
import { taskRouter } from './modules/task/routes'
import { parseError } from './error/parseError';

export const apiRouter = new Hono()
	.basePath('/api')
	.route('v1',
		new Hono().route('tasks', taskRouter)
	)

apiRouter.onError((err, c) => {
	console.error(`${err}`)
	const [text, status] = parseError(err)
	return c.text(text, status)
})

export type ApiRouter = typeof apiRouter;
