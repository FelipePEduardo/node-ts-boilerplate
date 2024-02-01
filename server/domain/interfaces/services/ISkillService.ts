import { SKillDto, SkillCreateDto } from '@domain/DTO';
import { Skill } from '@domain/models';

export default abstract class ISkillService {
  abstract search(): Promise<SKillDto[]>;
  abstract create(dto: SkillCreateDto): Promise<Skill>;
  abstract update(id: number, dto: SkillCreateDto): Promise<Skill>;
  abstract reactivate(id: number): Promise<void>;
  abstract inactivate(id: number): Promise<void>;
}