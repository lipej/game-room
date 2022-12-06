import {IUserRepository} from '#core/contracts/repositories/user';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {User} from '#core/entities/user';
import {RegisterUserDTO} from '../dtos/user/register-user';

export class RegisterUserUseCase
  implements IBaseUseCase<RegisterUserDTO, void>
{
  constructor(private readonly userRepo: IUserRepository) {}

  perform = async (args: RegisterUserDTO) => {
    const user = User.create({username: args.username, email: args.email});

    await this.userRepo.create(user);
  };
}
