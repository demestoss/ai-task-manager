import { tasks } from './tasks';
import * as auth from './auth';

export { tableCreator } from './table'

export const schema = { tasks, ...auth }

export type * from './tasks';