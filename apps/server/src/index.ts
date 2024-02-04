import { apiRouter } from '@repo/api';

export default {
  async fetch(req, env, ctx) {
    return apiRouter.fetch(req, env, ctx);
  }
};
