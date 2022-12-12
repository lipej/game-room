import {ProviderModel} from '#core/contracts/repositories/models/provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {Provider, Providers} from '#core/entities/provider';

export class ProviderRepositoryInMemory implements IProviderRepository {
  constructor(private readonly db: ProviderModel[]) {}

  listByType = async (type: string): Promise<Provider[]> => {
    const result = this.db.filter(it => it.type === type);

    return result.map(this.toEntity);
  };

  active = async (userId: string, type: string): Promise<void> => {
    this.db.forEach(it => {
      if (it.userId === userId && it.type === type) {
        it.isActive = true;
      }
    });
  };

  create = async (
    userId: string,
    {isActive, nick, score, type}: Provider
  ): Promise<void> => {
    this.db.push({userId, isActive, nick, score, type});
  };

  listByUserId = async (userId: string): Promise<Provider[]> => {
    const result = this.db.filter(provider => provider.userId === userId);

    return result.map(this.toEntity);
  };

  existsForNick = async (type: 'PSN', nick: string): Promise<boolean> => {
    return this.db.some(it => it.type === type && it.nick === nick);
  };

  existsForUser = async (type: 'PSN', userId: string): Promise<boolean> => {
    return this.db.some(it => it.userId === userId && it.type === type);
  };

  private toEntity = (model: ProviderModel) =>
    Provider.create(
      model.nick,
      model.type as Providers,
      model.isActive,
      model.score
    );
}
