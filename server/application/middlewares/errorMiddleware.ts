import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@domain/models';

export default function errorMiddleware(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (!error) next();

  console.log((error as Error).message);
  if (error instanceof CustomError) {
    return res.status(error.httpStatus).send({ message: error.message });
  }

  return res.status(500).send({ message: 'Internal Server Error ' });
}
