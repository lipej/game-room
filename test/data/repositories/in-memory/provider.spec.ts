import {ProviderModel} from '#core/contracts/repositories/models/provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {Provider} from '#core/entities/provider';
import {ProviderRepositoryInMemory} from '#data/repositories/in-memory/provider';

describe(ProviderRepositoryInMemory.name, () => {
  const provider = Provider.create('test');
  let db: ProviderModel[];
  let repo: IProviderRepository;

  beforeEach(() => {
    db = [];
    repo = new ProviderRepositoryInMemory(db);
  });

  it('should save a provider', async () => {
    await repo.create('1', provider);

    expect(db).toHaveLength(1);
  });

  it('should active a provider', async () => {
    await repo.create('1', provider);

    await repo.active('1', 'PSN');

    expect(db[0].isActive).toBeTruthy();
  });

  it('should list all providers by type', async () => {
    Array.from({length: 10}).forEach(
      async (_value, index) => await repo.create(String(index), provider)
    );

    const result = await repo.listByType('PSN');

    expect(result).toHaveLength(db.length);
  });

  it('should list all providers by userId', async () => {
    Array.from({length: 10}).forEach(
      async (_value, index) => await repo.create(String(index), provider)
    );

    const result = await repo.listByUserId('1');

    expect(result).toHaveLength(1);
  });
});
