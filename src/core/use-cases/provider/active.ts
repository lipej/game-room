import {IProviderRepository} from '#core/contracts/repositories/provider';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {ActiveProviderDTO} from './dtos/active';

export class ActiveProviderUseCase
  implements IBaseUseCase<ActiveProviderDTO, void>
{
  constructor(private readonly providerRepo: IProviderRepository) {}
  perform = async (args: ActiveProviderDTO): Promise<void> => {
    const providers = await this.providerRepo.listByUserId(args.userId);
    const provider = providers.find(it => it.type === args.provider);

    if (!provider) throw new Error('TODO');

    if (provider.isActive) return;

    await this.providerRepo.active(args.userId, args.provider);
  };
}
