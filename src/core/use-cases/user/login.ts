import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {IUserRepository} from '#core/contracts/repositories/user';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {PasswordValidation} from '#core/errors/password-validation';
import {LoginUserDTO} from './dtos/user/login';

export class LoginUserUseCase implements IBaseUseCase<LoginUserDTO, string> {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly encrypter: IEncrypter,
    private readonly tokenManager: ITokenManager
  ) {}

  perform = async (args: LoginUserDTO): Promise<string> => {
    const user = await this.userRepo.findByEmail(args.email);

    const isValidPassword = await this.encrypter.compare(
      args.password,
      user.password
    );

    if (!isValidPassword) throw new PasswordValidation(args.password.length);

    return this.tokenManager.sign(user);
  };
}
