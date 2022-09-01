import { Request, Response } from 'express';

export default abstract class IAuthController {
  abstract get(req: Request, res: Response): Promise<Response>;
}
