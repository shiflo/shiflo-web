import type { PropsWithChildren } from 'react';

interface HtmlProps extends PropsWithChildren {
  safeAreaTop: number;
  safeAreaBottom: number;
}

function Html({ children, safeAreaTop, safeAreaBottom }: HtmlProps) {
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
        <style>{`
          :root {
            --safe-area-inset-top: ${safeAreaTop}px;
            --safe-area-inset-bottom: ${safeAreaBottom}px;
          }
        `}</style>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

export default Html;
