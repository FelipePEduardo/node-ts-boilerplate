import { UserDto } from '@domain/DTO';
import { EntityBase, IEntityBase } from '../EntityBase';

export interface IUser extends IEntityBase {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export type IUserUpdate = {
  name?: string;
  email?: string;
  password?: string;
};

export class User extends EntityBase {
  protected name: string;
  protected email: string;
  protected password: string;
  protected role: string;

  constructor(props: IUser) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role ?? 'USER';
  }

  /* #region Getters */

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getRole() {
    return this.role;
  }

  public getPassword() {
    return this.password;
  }

  /* #endregion */

  /* #region Setters */

  private setName(name: string) {
    this.name = name;
  }

  private setEmail(email: string) {
    this.name = email;
  }

  private setPassword(password: string) {
    this.password = password;
  }

  /* #endregion */

  public update(dto: IUserUpdate) {
    const settersDictionary = {
      name: this.setName,
      email: this.setEmail,
      password: this.setPassword,
    };

    this.applyChanges(dto, settersDictionary);
    this.setUpdatedAt();
  }

  public toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
