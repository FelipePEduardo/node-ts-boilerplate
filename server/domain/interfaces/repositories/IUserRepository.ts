import { UserDto, UserUpdateDto } from '@domain/DTO';

export default abstract class IUserRepository {
  abstract getById(id: number): Promise<UserDto | undefined>;
  abstract search(): Promise<UserDto[]>;
  abstract update(id: number, body: UserUpdateDto): Promise<UserDto>;
}
