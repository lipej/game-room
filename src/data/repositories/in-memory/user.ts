import {UserModel} from '#core/contracts/repositories/models/user';
import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {UserNotFound} from '#core/errors/user-not-found';

export class UserRepositoryInMemory implements IUserRepository {
  constructor(private readonly db: UserModel[]) {}

  create = async (user: UserModel): Promise<void> => {
    this.db.push(user);
  };

  findByEmail = async (email: string): Promise<User> => {
    const result = this.db.find(user => user.email === email);

    if (!result) throw new UserNotFound(email);

    return this.toEntity(result);
  };

  private toEntity = (user: UserModel): User => User.create(user, false);
}
