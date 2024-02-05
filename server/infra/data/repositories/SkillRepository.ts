import { injectable } from 'inversify';
import BaseRepository from './BaseRepository';

import { ISkillRepository } from '@interfaces/repositories';
import { SKillDto } from '@domain/DTO';
import { Skill } from '@domain/models';
import { SkillMapper } from '@infra/data/mappers';

@injectable()
export default class SkillRepository extends BaseRepository implements ISkillRepository {
  async getById(id: number): Promise<Skill | undefined> {
    /* TODO: fix to take the skill from logged user */
    const query = await this.connection('skill')
      .select('id', 'name', 'user_id', 'created_at', 'updated_at', 'active')
      .where('id', id)
      .andWhere('user_id', 1)
      .first();

    if (!query) return undefined;
    return SkillMapper.mapOne(query);
  }

  async search(): Promise<SKillDto[]> {
    /* TODO: fix to take the skill from logged user */
    return this.connection('skill').select<SKillDto[]>('id', 'name', 'active').where('user_id', 1);
  }

  async create(entity: Skill): Promise<Skill> {
    const [createdId] = await this.connection('skill').insert({
      name: entity.getName(),
      user_id: entity.userId,
      created_at: entity.createdAt,
    });

    const created = await this.getById(createdId);

    if (!created) throw new Error(`Error while creating ${Skill.name}`);

    return created;
  }

  async update(entity: Skill): Promise<Skill> {
    await this.connection('skill')
      .update({
        name: entity.getName(),
        updated_at: entity.getUpdatedAt(),
      })
      .where('id', entity.id)
      .andWhere('user_id', entity.userId)
      .andWhere('active', true)

    const updated = await this.getById(entity.id);

    if (!updated) throw new Error(`Error while updating ${entity.getName} (Id: ${entity.id})`);

    return updated;
  }

  async reactivate(id: number): Promise<void> {
    /* TODO: fix to take the skill from logged user */
    await this.connection('skill')
      .update({
        active: true,
        updated_at: new Date(),
      })
      .where('id', id)
      .andWhere('user_id', 1)
      .andWhere('active', false);
  }

  async inactivate(id: number): Promise<void> {
    /* TODO: fix to take the skill from logged user */
    await this.connection('skill')
      .update({
        active: false,
        updated_at: new Date(),
      })
      .where('id', id)
      .andWhere('user_id', 1)
      .andWhere('active', true);
  }
}
