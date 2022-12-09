import {IProviderRepository} from '#core/contracts/repositories/provider';
import {Provider} from '#core/entities/provider';

type ProviderModel = {
  userId: string;
} & Provider;

export class ProvidersRepositoryInMemory implements IProviderRepository {
  constructor(private readonly db: ProviderModel[]) {}

  create = async (userId: string, provider: Provider): Promise<void> => {
    this.db.push({userId, ...provider});
  };

  listByUserId = async (userId: string): Promise<Provider[]> => {
    const result = this.db.filter(provider => provider.userId === userId);

    return result.map(this.toEntity);
  };

  private toEntity = (model: ProviderModel) =>
    Provider.create(model.nick, model.type, model.isValid, model.score);
}
