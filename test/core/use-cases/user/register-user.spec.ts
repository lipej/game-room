import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {ValidationError} from '#core/errors/validation';
import {RegisterUserUseCase} from '#core/use-cases/user/register-user';
import {UserRepositoryInMemory} from '#infra/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(RegisterUserUseCase.name, () => {
  let db: User[];
  let repo: IUserRepository;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    db = [];
    repo = new UserRepositoryInMemory(db);
    useCase = new RegisterUserUseCase(repo);
  });

  it('should register a user', async () => {
    const promise = useCase.perform(userParams);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should not register a user with invalid email', async () => {
    const promise = useCase.perform({...userParams, email: '123#123.com'});

    await expect(promise).rejects.toThrowError(
      new ValidationError('email', '123#123.com')
    );
  });
});
