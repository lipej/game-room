import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {UserNotFound} from '#core/errors/user-not-found';

export class UserRepositoryInMemory implements IUserRepository {
  constructor(private readonly db: User[]) {}

  create = async (user: User): Promise<void> => {
    this.db.push(user);
  };

  findByEmail = async (email: string): Promise<User> => {
    const result = this.db.find(user => user.email.value === email);

    if (!result) throw new UserNotFound(email);

    return result;
  };
}
