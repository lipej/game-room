import {INotifyProvider} from '#core/contracts/external-services/notify-provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {UserNotFound} from '#core/errors/user-not-found';
import {AddProviderUseCase} from '#core/use-cases/provider/add';
import {ProviderRepositoryInMemory} from '#data/repositories/in-memory/provider';
import {UserRepositoryInMemory} from '#data/repositories/in-memory/user';
import {userParams} from '?test/mocks/user';

describe(AddProviderUseCase.name, () => {
  let userRepo: IUserRepository;
  let providerRepo: IProviderRepository;
  let fakeNotifyProvider: INotifyProvider;
  let useCase: AddProviderUseCase;

  beforeEach(async () => {
    userRepo = new UserRepositoryInMemory([]);
    providerRepo = new ProviderRepositoryInMemory([]);
    fakeNotifyProvider = new (class {
      publish = async (userId: string, provider: 'PSN') => {
        console.log(userId, provider);
      };
    })();
    useCase = new AddProviderUseCase(
      userRepo,
      providerRepo,
      fakeNotifyProvider
    );
    await userRepo.create(User.create({...userParams, id: '1'}));
  });

  it('should add a new provider', async () => {
    await useCase.perform({
      nick: 'test',
      userEmail: userParams.email,
      provider: 'PSN',
    });
  });

  it('should throw if already exist same provider for user', async () => {
    await useCase.perform({
      nick: 'test',
      userEmail: userParams.email,
      provider: 'PSN',
    });

    const promise = useCase.perform({
      nick: 'newNick',
      userEmail: userParams.email,
      provider: 'PSN',
    });

    await expect(promise).rejects.toThrow(); //TODO adjust error
  });
});
