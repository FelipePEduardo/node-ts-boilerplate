import { UserDto } from '@domain/DTO';
import { User } from '@domain/models';

export default abstract class IUserRepository {
  abstract getById(id: number): Promise<User | undefined>;
  abstract search(): Promise<UserDto[]>;
  abstract create(entity: User): Promise<User>;
  abstract update(entity: User): Promise<User>;
  abstract inactivate(id: number): Promise<void>;
  abstract verifyIfEmailAlreadyExists(email: string): Promise<boolean>;
}
