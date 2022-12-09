import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {IIdentityManager} from '#core/contracts/protocols/identity-manager';
import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {ValidationError} from '#core/errors/validation';
import {RegisterUserUseCase} from '#core/use-cases/user/register';
import {EncrypterBCrypt} from '#data/protocols/encrypter/bcrypt-encrypter';
import {IdentityManagerKsuid} from '#data/protocols/identity-manager/ksuid-identity-manager';
import {UserRepositoryInMemory} from '#data/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(RegisterUserUseCase.name, () => {
  let db: User[];
  let repo: IUserRepository;
  let encrypter: IEncrypter;
  let identityManager: IIdentityManager;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    db = [];
    repo = new UserRepositoryInMemory(db);
    encrypter = new EncrypterBCrypt();
    identityManager = new IdentityManagerKsuid();
    useCase = new RegisterUserUseCase(repo, encrypter, identityManager);
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

  it('should not register a user with confirmation password invalid', async () => {
    const promise = useCase.perform({
      ...userParams,
      passwordConfirmation: '123',
    });

    await expect(promise).rejects.toThrowError(
      new ValidationError('password or passwordConfirmation', '#')
    );
  });
});
