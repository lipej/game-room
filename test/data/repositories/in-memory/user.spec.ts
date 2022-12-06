import {UserModel} from '#core/contracts/repositories/models/user';
import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {UserNotFound} from '#core/errors/user-not-found';
import {UserRepositoryInMemory} from '#data/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(UserRepositoryInMemory.name, () => {
  let db: UserModel[];
  let repository: IUserRepository;

  beforeEach(() => {
    db = [];
    repository = new UserRepositoryInMemory(db);
  });

  it('should register a new user', async () => {
    await repository.create(userParams);

    expect(db).toHaveLength(1);
  });

  it('should find a user', async () => {
    await repository.create(userParams);

    const result = await repository.findByEmail(userParams.email);

    expect(result.email).toBe(userParams.email);
    expect(result).toBeInstanceOf(User);
  });

  it('should throw when user is not found', async () => {
    const promise = repository.findByEmail(userParams.email);

    await expect(promise).rejects.toThrowError(
      new UserNotFound(userParams.email)
    );
  });
});
