import { SKillDto } from '@domain/DTO';
import { Skill } from '@domain/models';

export default abstract class ISkillRepository {
  abstract getById(id: number): Promise<Skill | undefined>;
  abstract search(): Promise<SKillDto[]>;
  abstract create(entity: Skill): Promise<Skill>;
  abstract update(entity: Skill): Promise<Skill>;
  abstract reactivate(id: number): Promise<void>;
  abstract inactivate(id: number): Promise<void>;
}
