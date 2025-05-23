import type { Context, Handler } from 'hono';
import { stream } from 'hono/streaming';
import type { RenderToReadableStreamOptions } from 'react-dom/server';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { renderToReadableStream } from 'react-dom/server.browser';

import App from './App';
import Html from './Html';

interface CreateRenderProps extends RenderToReadableStreamOptions {
  context: Context;
}

export async function createRender({
  context,
  bootstrapScriptContent,
  bootstrapModules,
  ...options
}: CreateRenderProps): Promise<ReturnType<Handler>> {
  const safeAreaTop = Number(context.req.header('top')) || 0;
  const safeAreaBottom = Number(context.req.header('bottom')) || 0;

  const readableStream = await renderToReadableStream(
    <Html safeAreaTop={safeAreaTop} safeAreaBottom={safeAreaBottom}>
      <App initPath={context.req.path} />
    </Html>,
    {
      bootstrapScriptContent: initBootstrapScriptContent(bootstrapScriptContent, {
        initPath: context.req.path
      }),
      bootstrapModules,
      ...options
    }
  );

  context.status(200);
  context.header('Transfer-Encoding', 'chunked');
  context.header('Content-Type', 'text/html; charset=UTF-8');

  return stream(context, (streamingApi) => streamingApi.pipe(readableStream));
}

function initBootstrapScriptContent(
  bootstrapScriptContent: CreateRenderProps['bootstrapScriptContent'],
  params: object
) {
  return `${bootstrapScriptContent || ''}${Object.keys(params)
    .map((key) => `window.${key}=${JSON.stringify(params[key as keyof typeof params])};`)
    .join(' ')}`;
}
