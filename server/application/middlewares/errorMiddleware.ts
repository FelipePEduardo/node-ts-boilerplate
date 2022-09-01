import { NextFunction, Request, Response } from 'express';

export default function errorMiddleware(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (!error) next();

  return res.status(500).send({ message: 'Internal Server Error ' });
}
