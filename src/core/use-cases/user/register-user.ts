import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {IUserRepository} from '#core/contracts/repositories/user';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {User} from '#core/entities/user';
import {RegisterUserDTO} from '../dtos/user/register-user';

export class RegisterUserUseCase
  implements IBaseUseCase<RegisterUserDTO, void>
{
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly encrypter: IEncrypter
  ) {}

  perform = async (args: RegisterUserDTO) => {
    const user = User.create({
      username: args.username,
      email: args.email,
      password: args.password,
    });

    const hashPassword = await this.encrypter.encrypt(user.password);

    await this.userRepo.create({
      email: user.email,
      password: hashPassword,
      username: user.username,
    });
  };
}
