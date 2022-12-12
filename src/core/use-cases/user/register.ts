import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {IIdentityManager} from '#core/contracts/protocols/identity-manager';
import {IUserRepository} from '#core/contracts/repositories/user';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {User} from '#core/entities/user';
import {DuplicateUserError} from '#core/errors/duplicate-user';
import {ValidationError} from '#core/errors/validation';
import {RegisterUserDTO} from './dtos/user/register';

export class RegisterUserUseCase
  implements IBaseUseCase<RegisterUserDTO, void>
{
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly encrypter: IEncrypter,
    private readonly identityManager: IIdentityManager
  ) {}

  perform = async (args: RegisterUserDTO) => {
    if (await this.userRepo.exists(args)) throw new DuplicateUserError();

    if (args.password !== args.passwordConfirmation)
      throw new ValidationError('password or passwordConfirmation', '#');

    const id = this.identityManager.generate();

    const user = User.create({
      id,
      username: args.username,
      email: args.email,
      password: args.password,
    });

    const hashPassword = await this.encrypter.encrypt(user.password);

    await this.userRepo.create({
      id: user.id,
      email: user.email,
      password: hashPassword,
      username: user.username,
    });
  };
}
