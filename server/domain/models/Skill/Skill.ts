import { SKillDto } from '@domain/DTO';
import { EntityBase, IEntityBase } from '../EntityBase';

export interface ISkill extends IEntityBase {
  name: string;
  userId: number;
}

export interface ISkillUpdate {
  name?: string;
}

export class Skill extends EntityBase {
  protected name: string;
  readonly userId: number;

  constructor(props: ISkill) {
    super(props);
    this.name = props.name;
    this.userId = props.userId;
  }

  /* #region Getters */

  public getName() {
    return this.name;
  }

  /* #endregion */

  /* #region Setters */

  private setName(name: string) {
    this.name = name;
  }

  /* #endregion */

  public update(dto: ISkillUpdate) {
    const setterDictionary = {
      name: this.setName,
    };

    this.applyChanges(dto, setterDictionary);
    this.setUpdatedAt()
  }

  public toDto(): SKillDto {
    return {
      id: this.id,
      name: this.name,
      active: this.active
    }
  }
}
