import {PrismaSingleton} from '#application/singleton/prisma';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {ActiveProviderUseCase} from '#core/use-cases/provider/active';
import {ProviderRepositoryPrisma} from '#data/repositories/prisma/provider';
import {ActiveProviderController} from '#presentation/controllers/provider/active';
import {PrismaClient} from '@prisma/client';

export class ActiveProviderControllerFactory {
  static create = (): ActiveProviderController => {
    const client: PrismaClient = PrismaSingleton.instance;
    const providerRepo: IProviderRepository = new ProviderRepositoryPrisma(
      client
    );
    const useCase: ActiveProviderUseCase = new ActiveProviderUseCase(
      providerRepo
    );

    return new ActiveProviderController(useCase);
  };
}
