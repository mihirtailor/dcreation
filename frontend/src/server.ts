import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Add this import for the proxy
import { createProxyMiddleware } from 'http-proxy-middleware';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const localizedBrowserDistFolder = resolve(browserDistFolder, 'en-US');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Set up API proxy to forward requests to the backend
 */
app.use('/api', createProxyMiddleware({
  target: 'https://dcreation.onrender.com',
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    '^/api': '/api' // Keep the /api path when forwarding
  },
  logger: console
}));

// Add this specific route before the catch-all
app.get('/', (req, res) => {
  console.log('Root path requested');
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        console.log('Response generated for root path');
        writeResponseToNodeResponse(response, res);
      } else {
        console.log('No response for root path');
        res.sendFile(resolve(localizedBrowserDistFolder, 'index.html'));
      }
    })
    .catch(err => {
      console.error('Error handling root path:', err);
      res.sendFile(resolve(localizedBrowserDistFolder, 'index.html'));
    });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(localizedBrowserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Add this middleware to handle /en-US prefixed paths
 */
app.use('/en-US',
  express.static(localizedBrowserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('*', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI.
 */
export const reqHandler = createNodeRequestHandler(app);
