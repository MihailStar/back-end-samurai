import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import { courseRoute } from './endpoint/course/route';
import { handleError } from './middleware/handle-error';
import { handleUnregisteredRoute } from './middleware/handle-unregistered-route';

function createApp(): Express {
  const app = express();

  app
    /* .disable('x-powered-by') */
    .use(helmet())
    .use('/courses?', courseRoute)
    .use(handleUnregisteredRoute)
    .use(handleError);

  return app;
}

export { createApp };
