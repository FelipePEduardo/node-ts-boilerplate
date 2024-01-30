export interface IEntityBase {
  id?: number;
  createdAt?: Date;
  updatedAt: Date | null;
  active?: boolean;
}

export abstract class EntityBase {
  readonly id: number;
  readonly active: boolean;
  readonly createdAt: Date;
  protected updatedAt: Date | null;

  constructor(props: IEntityBase) {
    this.id = props.id ?? 0;
    this.active = props.active ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
  }

  /* #region Getters */

  public getUpdatedAt() {
    return this.updatedAt;
  }

  /* #endregion */

  /* #region Setters */

  protected setUpdatedAt() {
    this.updatedAt = new Date();
  }

  /* #endregion */

  protected applyChanges(entity, settersDictionary) {
    Object.entries(entity).forEach(([key, value]) => {
      if (settersDictionary[key] && settersDictionary[key] !== undefined && value !== undefined) {
        settersDictionary[key].bind(this)(value);
      }
    });
  }
}
