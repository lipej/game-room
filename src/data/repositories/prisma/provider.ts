import {ProviderModel} from '#core/contracts/repositories/models/provider';
import {IProviderRepository} from '#core/contracts/repositories/provider';
import {Provider, Providers} from '#core/entities/provider';
import {PrismaClient} from '@prisma/client';

export class ProviderRepositoryPrisma implements IProviderRepository {
  constructor(private readonly client: PrismaClient) {}

  create = async (
    userId: string,
    {isActive, nick, score, type}: Provider
  ): Promise<void> => {
    await this.client.provider.create({
      data: {isActive, nick, score, type, userId},
    });
  };

  listByType = async (type: Providers): Promise<Provider[]> => {
    const result = await this.client.provider.findMany({where: {type}});

    return result.map(this.toEntity);
  };

  active = async (userId: string, type: Providers): Promise<void> => {
    await this.client.provider.update({
      where: {userId_type: {userId, type}},
      data: {isActive: true},
    });
  };

  listByUserId = async (userId: string): Promise<Provider[]> => {
    const result = await this.client.provider.findMany({where: {userId}});

    return result.map(this.toEntity);
  };

  exists = async (
    userId: string,
    type: 'PSN',
    nick: string
  ): Promise<boolean> =>
    !!(await this.client.provider.findUnique({
      where: {userId_type: {userId, type}},
    })) ||
    !!(await this.client.provider.findUnique({
      where: {type_nick: {type, nick}},
    }));

  private toEntity = (model: ProviderModel) =>
    Provider.create(
      model.nick,
      model.type as Providers,
      model.isActive,
      model.score
    );
}
