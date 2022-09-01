import { Handler, NextFunction, Request, Response } from 'express';

export default (fn: Handler) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch((e) => next(e));
