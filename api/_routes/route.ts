import type { Context } from 'hono';

import createRoute from '@api/_utils/createRoute';

export default function route() {
  return createRoute((createRender) => ({
    method: 'get',
    path: '*',
    render: (context: Context) => createRender({ context })
  }));
}
