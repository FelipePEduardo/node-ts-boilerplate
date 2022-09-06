import 'reflect-metadata';
import { join } from 'path';

import app from './app';
import { defineRoutes } from './application/helpers';
import { errorMiddleware, custom404Middleware } from '@application/middlewares';

defineRoutes(app, join(__dirname, 'application', 'controllers')).then(() => {
  const { SERVER_PORT } = process.env;

  app.use(custom404Middleware);
  app.use(errorMiddleware);

  app.listen(SERVER_PORT, () => {
    console.log('System Started');
  });
});
