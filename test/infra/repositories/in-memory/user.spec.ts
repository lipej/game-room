import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {UserNotFound} from '#core/errors/user-not-found';
import {UserRepositoryInMemory} from '#infra/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(UserRepositoryInMemory.name, () => {
  let db: User[];
  let repository: IUserRepository;

  beforeEach(() => {
    db = [];
    repository = new UserRepositoryInMemory(db);
  });

  it('should register a new user', async () => {
    const user = User.create(userParams);

    await repository.create(user);

    expect(db).toHaveLength(1);
  });

  it('should find a user', async () => {
    const user = User.create(userParams);
    await repository.create(user);

    const result = await repository.findByEmail(userParams.email);

    expect(result).toEqual(user);
    expect(result).toBeInstanceOf(User);
  });

  it('should throw when user is not found', async () => {
    const promise = repository.findByEmail(userParams.email);

    await expect(promise).rejects.toThrowError(
      new UserNotFound(userParams.email)
    );
  });
});
