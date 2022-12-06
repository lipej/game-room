import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
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
    const promise = useCase.execute(userParams);

    await expect(promise).resolves;
  });
});
