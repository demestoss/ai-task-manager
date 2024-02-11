import { z } from 'zod';

export const UserId = z.string().uuid()
export type UserId = z.infer<typeof UserId>