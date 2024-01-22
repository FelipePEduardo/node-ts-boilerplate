import express, { Application } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { corsMiddleware } from '@application/middlewares';

dotenv.config();

const app: Application = express();
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(corsMiddleware);

export default app;
