import { Request, Response } from 'express';

export default abstract class IUserController {
  abstract search(req: Request, res: Response): Promise<Response>;
  abstract create(req: Request, res: Response): Promise<Response>;
  abstract update(req: Request, res: Response): Promise<Response>;
  abstract inactivate(req: Request, res: Response): Promise<Response>;
}
