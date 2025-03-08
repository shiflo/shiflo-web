import type { Context } from 'hono';

import createRoute from '@api/_utils/createRoute';

export default function myRoute() {
  return createRoute((createRender) => ({
    method: 'get',
    path: '/my',
    render: (context: Context) => createRender({ context })
  }));
}
