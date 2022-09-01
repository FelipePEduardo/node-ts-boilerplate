import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IAuthController } from 'server/domain/interfaces/controllers';

@injectable()
export default class AuthController implements IAuthController {
  public async get(_req: Request, res: Response): Promise<Response> {
    return res.json({ message: 'Hello World Auth' });
  }
}
