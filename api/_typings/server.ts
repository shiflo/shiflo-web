import type { Context, Next } from 'hono';

import type { createRender } from '@server';

export type Route = () => (renderer: typeof createRender) => {
  method: 'get';
  path: string;
  render: (context: Context, next: Next) => ReturnType<typeof createRender>;
};
