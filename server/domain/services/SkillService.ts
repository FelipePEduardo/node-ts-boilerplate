import { injectable } from 'inversify';

import { ISkillService } from '@interfaces/services';
import { ISkillRepository } from '@interfaces/repositories';
import { SKillDto, SkillCreateDto, SkillUpdateDto } from '@domain/DTO';
import { EntityNotFoundError, Skill } from '@domain/models';

@injectable()
export default class SkillService implements ISkillService {
  constructor(private repository: ISkillRepository) {}

  async search(): Promise<SKillDto[]> {
    return this.repository.search();
  }

  async create(dto: SkillCreateDto): Promise<Skill> {
    const skill = new Skill({
      ...dto,
      userId: 1,
      updatedAt: null,
    });

    return this.repository.create(skill);
  }

  async update(id: number, dto: SkillUpdateDto): Promise<Skill> {
    const skill = await this.repository.getById(id);

    if (!skill) throw new EntityNotFoundError('skill', id);

    skill.update(dto);

    return this.repository.update(skill);
  }

  async reactivate(id: number): Promise<void> {
    const skillToInactivate = await this.repository.getById(id);

    if (!skillToInactivate) throw new EntityNotFoundError('skill', id);

    await this.repository.reactivate(id);
  }

  async inactivate(id: number): Promise<void> {
    const skillToInactivate = await this.repository.getById(id);

    if (!skillToInactivate) throw new EntityNotFoundError('skill', id);

    await this.repository.inactivate(id);
  }
}
