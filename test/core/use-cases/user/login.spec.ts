import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {IUserRepository} from '#core/contracts/repositories/user';
import {PasswordValidation} from '#core/errors/password-validation';
import {LoginUserUseCase} from '#core/use-cases/user/login';
import {EncrypterBCrypt} from '#data/protocols/encrypter/bcrypt-encrypter';
import {TokenManagerJWT} from '#data/protocols/token-manager/jwt-token-manager';
import {UserRepositoryInMemory} from '#data/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(LoginUserUseCase.name, () => {
  let repo: IUserRepository;
  let encrypter: IEncrypter;
  let tokenManager: ITokenManager;
  let useCase: LoginUserUseCase;

  beforeEach(async () => {
    repo = new UserRepositoryInMemory([]);
    encrypter = new EncrypterBCrypt();
    tokenManager = new TokenManagerJWT();
    useCase = new LoginUserUseCase(repo, encrypter, tokenManager);

    await repo.create({
      ...userParams,
      id: '2IdydHQVYRfGqdGf3ciQPR3KCL2',
      password: await encrypter.encrypt(userParams.password),
    });
  });

  it('should fail if password wont match', async () => {
    const promise = useCase.perform({
      email: userParams.email,
      password: 'any_password',
    });

    await expect(promise).rejects.toThrowError(
      new PasswordValidation('any_password'.length)
    );
  });

  it('should generate a token', async () => {
    const result = await useCase.perform(userParams);

    expect(result).not.toBeUndefined();
  });
});
