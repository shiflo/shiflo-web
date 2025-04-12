import type { PropsWithChildren } from 'react';

function Html({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>Shiflo</title>
        {import.meta.env.PROD ? (
          <script type="module" src="/client.js"></script>
        ) : (
          <script type="module" src="/src/client.tsx"></script>
        )}
        <link
          href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

export default Html;
