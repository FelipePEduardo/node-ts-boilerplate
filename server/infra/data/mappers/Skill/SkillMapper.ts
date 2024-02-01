import { Skill } from '@domain/models';
import { SkillQueryResponse } from '@infra/data/query-responses';

export default abstract class SkillMapper {
  static mapOne(query: SkillQueryResponse): Skill {
    return new Skill({
      ...query,
      userId: query.user_id,
      updatedAt: query.updated_at ?? null,
    });
  }
}
