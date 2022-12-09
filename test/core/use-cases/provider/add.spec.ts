import {INotifyProvider} from '#core/contracts/external-services/notify-provider';
import {User} from '#core/entities/user';
import {AddProviderUseCase} from '#core/use-cases/provider/add';
import {ProvidersRepositoryInMemory} from '#data/repositories/in-memory/providers';
import {UserRepositoryInMemory} from '#data/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(AddProviderUseCase.name, () => {
  const userRepo = new UserRepositoryInMemory([]);
  const providerRepo = new ProvidersRepositoryInMemory([]);
  const fakeNotifyProvider: INotifyProvider = new (class {
    publish = async (userId: string, provider: 'PSN') => {
      console.log(userId, provider);
    };
  })();
  const useCase = new AddProviderUseCase(
    userRepo,
    providerRepo,
    fakeNotifyProvider
  );

  beforeAll(async () => {
    await userRepo.create(User.create({...userParams, id: '1'}));
  });

  it('should add a new provider', async () => {
    await useCase.perform({
      nick: 'LStamets',
      userEmail: userParams.email,
      provider: 'PSN',
    });
  });
});
