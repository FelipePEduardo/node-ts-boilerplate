import { injectable } from 'inversify';
import { IUserRepository } from '@interfaces/repositories';
import BaseRepository from './BaseRepository';
import { UserDto } from '@domain/DTO';
import { User } from '@domain/models';
import UserMapper from '../mappers/User/UserMapper';

@injectable()
export default class UserRepository extends BaseRepository implements IUserRepository {
  async getById(id: number): Promise<User | undefined> {
    const user = await this.connection('user').select('*').where('id', id).andWhere('active', true).first();

    if (!user) return undefined;

    return UserMapper.mapOne(user);
  }

  async search(): Promise<UserDto[]> {
    return this.connection('user').select<UserDto[]>('id', 'name', 'email').where('active', true);
  }

  async create(entity: User): Promise<User> {
    const [createdId] = await this.connection('user').insert({
      name: entity.getName(),
      email: entity.getEmail(),
      password: entity.getPassword(),
      role: entity.getRole(),
    });

    const created = await this.getById(createdId);

    if (!created) throw new Error(`Error while creating ${User.name}`);

    return created;
  }

  async update(entity: User): Promise<User> {
    await this.connection('user')
      .update({
        name: entity.getName(),
        email: entity.getEmail(),
        password: entity.getPassword(),
        updated_at: entity.getUpdatedAt(),
      })
      .where('id', entity.id);

    const updated = await this.getById(entity.id);

    if (!updated) throw new Error(`Error while updating ${entity.getName} (Id: ${entity.id})`);

    return updated;
  }

  async inactivate(id: number): Promise<void> {
    await this.connection('user').update({ active: 0, updated_at: new Date() }).where('id', id);
  }

  async verifyIfEmailAlreadyExists(email: string): Promise<boolean> {
    const emailAlreadyExists = await this.connection('user').where('email', email).first();

    if (emailAlreadyExists) return true;

    return false;
  }
}
