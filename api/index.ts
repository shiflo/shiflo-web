import path from 'path';

import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import type { Route } from '@api/_typings/server';

const app = new Hono();

const { routes, createRender } = await getConfig();

routes.forEach((route) => {
  const { method, path, render } = route()(createRender);

  app[method](path, render);
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;

export default process.env.VERCEL ? undefined : app;

async function getConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  const routes = (
    isProduction
      ? await import(/* @vite-ignore */ path.join(process.cwd(), 'dist', 'routes.js'))
      : await import('./_routes.ts')
  )?.default as Route[];
  const { createRender } = isProduction
    ? await import(/* @vite-ignore */ path.join(process.cwd(), 'dist', 'server.js'))
    : await import('../src/server.tsx');

  return {
    routes,
    createRender
  };
}
