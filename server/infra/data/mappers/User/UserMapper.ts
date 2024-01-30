import { User } from '@domain/models';
import { UserQueryResponse } from '@infra/data/query-responses';

export default abstract class UserMapper {
  static mapOne(query: UserQueryResponse): User {
    return new User(query);
  }
}
