import { UserCreateDto, UserDto, UserUpdateDto } from '@domain/DTO';
import IUsersRepository from '@domain/interfaces/repositories/IUserRepository';
import IUsersService from '@domain/interfaces/services/IUserService';
import { CustomError, EntityNotFoundError, User } from '@domain/models';
import { injectable } from 'inversify';

@injectable()
export default class UserService implements IUsersService {
  constructor(private repository: IUsersRepository) {}

  async search(): Promise<UserDto[]> {
    return this.repository.search();
  }

  async create(dto: UserCreateDto): Promise<User> {
    const emailAlreadyExists = await this.repository.verifyIfEmailAlreadyExists(dto.email);

    if (emailAlreadyExists) {
      throw new CustomError('Email already exists', 404);
    }

    const user = new User({
      ...dto,
      updatedAt: null,
    });

    return this.repository.create(user);
  }

  async update(id: number, dto: UserUpdateDto): Promise<User> {
    const user = await this.repository.getById(id);

    if (!user) throw new EntityNotFoundError('user', id);

    if (dto.email) {
      const emailAlreadyExists = await this.repository.verifyIfEmailAlreadyExists(dto.email);

      if (emailAlreadyExists) {
        throw new CustomError('Email already exists', 401);
      }
    }

    user.update(dto);

    return this.repository.update(user);
  }

  async inactivate(id: number): Promise<void> {
    const userToDelete = await this.repository.getById(id);

    if (!userToDelete) throw new EntityNotFoundError('user', id);

    await this.repository.inactivate(id);
  }
}
