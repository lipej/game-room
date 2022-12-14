import {INotifyProvider} from '#core/contracts/external-services/notify-provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {IUserRepository} from '#core/contracts/repositories/user';
import {IBaseUseCase} from '#core/contracts/use-cases/base';
import {Provider} from '#core/entities/provider';
import {DuplicateProviderError} from '#core/errors/duplicate-provider';
import {AddProviderDTO} from './dtos/add';

export class AddProviderUseCase implements IBaseUseCase<AddProviderDTO, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly providerRepo: IProviderRepository,
    private readonly notifyProvider: INotifyProvider
  ) {}

  perform = async (args: AddProviderDTO): Promise<void> => {
    const user = await this.userRepository.findByEmail(args.userEmail);

    if (await this.providerRepo.existsForUser(args.provider, user.id))
      throw new DuplicateProviderError(args.provider);

    if (await this.providerRepo.existsForNick(args.provider, args.nick))
      throw new DuplicateProviderError(args.provider, args.nick);

    const newProvider = Provider.create(args.nick);

    await this.providerRepo.create(user.id, newProvider);

    await this.notifyProvider.publish(user.id, args.provider);
  };
}
