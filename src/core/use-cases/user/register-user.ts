import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {RegisterUserDTO} from '../dtos/user/register-user';

export class RegisterUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  execute = async (args: RegisterUserDTO) => {
    const user = User.create({username: args.username, email: args.email});

    await this.userRepo.create(user);
  };
}
