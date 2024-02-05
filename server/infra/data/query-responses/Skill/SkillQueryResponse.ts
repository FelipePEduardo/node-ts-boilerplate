export type SkillQueryResponse = {
  readonly id: number;
  readonly name: string;
  readonly user_id: number;
  readonly created_at: Date;
  readonly updated_at: Date | null;
  readonly active: boolean;
};
