import type { BaseActivityPath } from 'basic-navigation';

import myRoute from '@api/_routes/my/route';
import route from '@api/_routes/route';
import type { Route } from '@api/_typings/server';

type RouteMap = Record<BaseActivityPath[keyof BaseActivityPath], Route>;

const routeMap: RouteMap = {
  '/': route,
  '/my': myRoute,
  '/*path': route
};

const routes = Object.keys(routeMap)
  .sort((a, b) => b.localeCompare(a))
  .map((path) => routeMap[path as keyof RouteMap]);

export default routes;
