import { UserDto, UserUpdateDto } from '@domain/DTO';
import IUsersRepository from '@domain/interfaces/repositories/IUserRepository';
import IUsersService from '@domain/interfaces/services/IUserService';
import { EntityNotFoundError } from '@domain/models';
import { injectable } from 'inversify';

@injectable()
export default class UserService implements IUsersService {
  constructor(private UserRepository: IUsersRepository) {}

  async search(): Promise<UserDto[]> {
    return this.UserRepository.search();
  }

  async update(id: number, body: UserUpdateDto): Promise<UserDto> {
    const userExists = await this.UserRepository.getById(id);

    if (!userExists) throw new EntityNotFoundError('user', id);

    return this.UserRepository.update(id, body);
  }
}
