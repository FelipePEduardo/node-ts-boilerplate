import { UserDto, UserUpdateDto, UserCreateDto } from '@domain/DTO';
import { User } from '@domain/models';

export default abstract class IUserService {
  abstract search(): Promise<UserDto[]>;
  abstract create(dto: UserCreateDto): Promise<User>;
  abstract update(id: number, dto: UserUpdateDto): Promise<User>;
  abstract inactivate(id: number): Promise<void>;
}
