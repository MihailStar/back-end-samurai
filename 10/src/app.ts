import type { Express } from 'express';
import express from 'express';
import helmet from 'helmet';
import { handleError } from './middleware/handle-error';
import { handleUnregisteredRoute } from './middleware/handle-unregistered-route';
import { courseRoute } from './resource/course/route';

function createApp(): Express {
  const app = express();

  app
    .use(helmet())
    .use('/courses?', courseRoute)
    .use(handleUnregisteredRoute)
    .use(handleError);

  return app;
}

export { createApp };
