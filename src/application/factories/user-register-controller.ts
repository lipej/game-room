import {PrismaSingleton} from '#application/singleton/prisma';
import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {IIdentityManager} from '#core/contracts/protocols/identity-manager';
import {IUserRepository} from '#core/contracts/repositories/user';
import {RegisterUserUseCase} from '#core/use-cases/user/register';
import {EncrypterBCrypt} from '#data/protocols/encrypter/bcrypt-encrypter';
import {IdentityManagerKsuid} from '#data/protocols/identity-manager/ksuid-identity-manager';
import {UserRepositoryPrisma} from '#data/repositories/prisma/user';
import {RegisterUserController} from '#presentation/controllers/user/register';
import {PrismaClient} from '@prisma/client';

export class UserRegisterControllerFactory {
  static create = (): RegisterUserController => {
    const client: PrismaClient = PrismaSingleton.instance;
    const userRepo: IUserRepository = new UserRepositoryPrisma(client);
    const encrypter: IEncrypter = new EncrypterBCrypt();
    const idManager: IIdentityManager = new IdentityManagerKsuid();
    const useCase: RegisterUserUseCase = new RegisterUserUseCase(
      userRepo,
      encrypter,
      idManager
    );

    return new RegisterUserController(useCase);
  };
}
