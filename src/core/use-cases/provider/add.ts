import {INotifyProvider} from '#core/contracts/external-services/notify-provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {IUserRepository} from '#core/contracts/repositories/user';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {Provider} from '#core/entities/provider';
import {AddProviderDTO} from './dtos/add';

export class AddProviderUseCase implements IBaseUseCase<AddProviderDTO, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly providerRepo: IProviderRepository,
    private readonly notifyProvider: INotifyProvider
  ) {}

  perform = async (args: AddProviderDTO): Promise<void> => {
    const user = await this.userRepository.findByEmail(args.userEmail);

    if (!user) throw new Error('TODO');

    const providers = await this.providerRepo.listByUserId(user.id);

    user.providers = providers;

    if (user.providers.find(({type}) => type === 'PSN'))
      throw new Error('TODO');

    const newProvider = Provider.create(args.nick);

    await this.providerRepo.create(user.id, newProvider);

    await this.notifyProvider.publish(user.id, args.provider);
  };
}
