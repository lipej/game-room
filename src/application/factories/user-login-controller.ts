import {PrismaSingleton} from '#application/singleton/prisma';
import {IEncrypter} from '#core/contracts/protocols/encrypter';
import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {IUserRepository} from '#core/contracts/repositories/user';
import {LoginUserUseCase} from '#core/use-cases/user/login';
import {EncrypterBCrypt} from '#data/protocols/encrypter/bcrypt-encrypter';
import {TokenManagerJWT} from '#data/protocols/token-manager/jwt-token-manager';
import {UserRepositoryPrisma} from '#data/repositories/prisma/user';
import {LoginUserController} from '#presentation/controllers/user/login';
import {PrismaClient} from '@prisma/client';

export class UserLoginControllerFactory {
  static create = (): LoginUserController => {
    const client: PrismaClient = PrismaSingleton.instance;
    const userRepo: IUserRepository = new UserRepositoryPrisma(client);
    const encrypter: IEncrypter = new EncrypterBCrypt();
    const tokenManager: ITokenManager = new TokenManagerJWT();
    const useCase: LoginUserUseCase = new LoginUserUseCase(
      userRepo,
      encrypter,
      tokenManager
    );

    return new LoginUserController(useCase);
  };
}
