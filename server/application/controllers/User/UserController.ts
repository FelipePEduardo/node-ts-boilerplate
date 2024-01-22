import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { IUserController } from '@interfaces/controllers';
import { IUserService } from '@interfaces/services';
import validateNumericProp from '@application/helpers/validateNumericProp';

@injectable()
export default class UserController implements IUserController {
  constructor(private UserService: IUserService) {}

  public async search(req: Request, res: Response): Promise<Response> {
    const result = await this.UserService.search();

    return res.json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { params, body } = req;

    const id = validateNumericProp(params.id, 'id')

    const result = await this.UserService.update(id, body);

    console.log(result)

    return res.json(result);
  }
}
