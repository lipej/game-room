import {PrismaSingleton} from '#application/singleton/prisma';
import {INotifyProvider} from '#core/contracts/external-services/notify-provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {IUserRepository} from '#core/contracts/repositories/user';
import {AddProviderUseCase} from '#core/use-cases/provider/add';
import {NotifyProviderRabbitMQ} from '#data/producers/rabbitmq/notify-provider';
import {ProviderRepositoryPrisma} from '#data/repositories/prisma/provider';
import {UserRepositoryPrisma} from '#data/repositories/prisma/user';
import {AddProviderController} from '#presentation/controllers/provider/add';
import {PrismaClient} from '@prisma/client';

export class AddProviderControllerFactory {
  static create = (): AddProviderController => {
    const client: PrismaClient = PrismaSingleton.instance;
    const userRepo: IUserRepository = new UserRepositoryPrisma(client);
    const providerRepo: IProviderRepository = new ProviderRepositoryPrisma(
      client
    );
    const notifyProvider: INotifyProvider = new NotifyProviderRabbitMQ(
      <string>process.env.RABBITMQ_GROUP
    );
    const useCase: AddProviderUseCase = new AddProviderUseCase(
      userRepo,
      providerRepo,
      notifyProvider
    );

    return new AddProviderController(useCase);
  };
}
