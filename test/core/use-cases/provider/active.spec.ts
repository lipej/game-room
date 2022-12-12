import {IProviderRepository} from '#core/contracts/repositories/provider';
import {Provider} from '#core/entities/provider';
import {ProviderNotFound} from '#core/errors/provider-not-found';
import {ActiveProviderUseCase} from '#core/use-cases/provider/active';
import {ProviderRepositoryInMemory} from '#data/repositories/in-memory/provider';

describe(ActiveProviderUseCase.name, () => {
  let providerRepo: IProviderRepository;
  let useCase: ActiveProviderUseCase;
  let spy: jest.SpyInstance;
  beforeEach(async () => {
    providerRepo = new ProviderRepositoryInMemory([]);
    spy = jest.spyOn(providerRepo, 'active');
    useCase = new ActiveProviderUseCase(providerRepo);
    await providerRepo.create('1', Provider.create('test'));
  });

  it('should active provider', async () => {
    await useCase.perform({
      provider: 'PSN',
      userId: '1',
    });

    const result = await providerRepo.listByUserId('1');

    expect(result[0].isActive).toBeTruthy();
  });

  it('should throw if not found provider for userId', async () => {
    const promise = useCase.perform({
      provider: 'PSN',
      userId: '2',
    });

    await expect(promise).rejects.toThrowError(
      new ProviderNotFound('PSN', '2')
    );
  });

  it('should not call active if is already active', async () => {
    await providerRepo.create('2', Provider.create('test', 'PSN', true, 0));

    await useCase.perform({
      provider: 'PSN',
      userId: '2',
    });

    expect(spy).not.toBeCalled();
  });
});
