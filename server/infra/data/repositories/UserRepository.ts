import { injectable } from 'inversify';
import { IUserRepository } from '@interfaces/repositories';
import BaseRepository from './BaseRepository';
import { UserDto, UserUpdateDto } from '@domain/DTO';

@injectable()
export default class UserRepository extends BaseRepository implements IUserRepository {
  async getById(id: number): Promise<UserDto | undefined> {
    const query = await this.connection('users').select('*').where('id', id).first();

    if (!query) return undefined;

    return query;
  }

  async search(): Promise<UserDto[]> {
    const users = await this.connection('users').select('*');

    return users;
  }

  async update(id: number, body: UserUpdateDto): Promise<UserDto> {
    await this.connection('users')
      .update({ ...body, updated_at: new Date() })
      .where('id', id);

    const updated = await this.getById(id);

    /* TODO: FIX BODY BECAUSE NOT ALWAYS CONTAINS NAME  */
    if (!updated) throw new Error(`Error while updating ${body.name} (Id: ${id})`);

    return updated;
  }
}
