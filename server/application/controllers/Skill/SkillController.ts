import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { ISkillController } from '@interfaces/controllers';
import { ISkillService } from '@interfaces/services';
import { validateNumericProp } from '@application/helpers';

@injectable()
export default class SkillController implements ISkillController {
  constructor(private service: ISkillService) {}

  async search(req: Request, res: Response): Promise<Response> {
    const skills = await this.service.search();

    return res.json(skills);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const skill = await this.service.create(body);

    return res.json(skill.toDto()).status(201);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { params, body } = req;

    const id = validateNumericProp(params.id, 'id');

    const skill = await this.service.update(id, body);

    return res.json(skill.toDto()).status(201);
  }

  async reactivate(req: Request, res: Response): Promise<Response> {
    const { params } = req;

    const id = validateNumericProp(params.id, 'id');

    await this.service.reactivate(id);

    return res.sendStatus(204)
  }

  async inactivate(req: Request, res: Response): Promise<Response> {
    const { params } = req;

    const id = validateNumericProp(params.id, 'id');

    await this.service.inactivate(id);

    return res.sendStatus(204)
  }
}
