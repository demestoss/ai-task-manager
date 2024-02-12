import { z } from 'zod';

export const PaginationParams = z.object({
  limit: z.number(),
  offset: z.number()
});
export type PaginationParams = z.infer<typeof PaginationParams>;

export const QueryPaginationParams = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => {
      if (v === undefined) return undefined;
      const numberish = Number(v);
      return isNaN(numberish) ? undefined : numberish;
    })
    .default('50'),
  offset: z
    .string()
    .optional()
    .transform((v) => {
      if (v === undefined) return undefined;
      const numberish = Number(v);
      return isNaN(numberish) ? undefined : numberish;
    })
    .default('0')
});
export type QueryPaginationParams = z.infer<typeof QueryPaginationParams>;
