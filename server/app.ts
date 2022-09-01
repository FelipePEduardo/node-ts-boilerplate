import express, { Application } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(helmet());

export default app;
