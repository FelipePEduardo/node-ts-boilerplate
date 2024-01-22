import { UserDto, UserUpdateDto } from '@domain/DTO';

export default abstract class IUserService {
  abstract search(): Promise<UserDto[]>;
  abstract update(id: number, body: UserUpdateDto): Promise<UserDto>;
}
