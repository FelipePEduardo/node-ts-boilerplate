import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { IUserController } from '@interfaces/controllers';
import { IUserService } from '@interfaces/services';
import validateNumericProp from '@application/helpers/validateNumericProp';

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async search(req: Request, res: Response): Promise<Response> {
    const users = await this.service.search();

    return res.json(users);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const user = await this.service.create(body);

    return res.json(user.toDto()).status(201);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { params, body } = req;

    const id = validateNumericProp(params.id, 'id');

    const user = await this.service.update(id, body);

    return res.json(user.toDto());
  }

  async inactivate(req: Request, res: Response): Promise<Response> {
    const { params } = req;

    const id = validateNumericProp(params.id, 'id');

    await this.service.inactivate(id);

    return res.sendStatus(204);
  }
}
