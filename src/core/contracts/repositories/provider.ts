import {Provider} from '#core/entities/provider';
import {Providers} from '@prisma/client';

export interface IProviderRepository {
  create: (userId: string, provider: Provider) => Promise<void>;
  listByUserId: (userId: string) => Promise<Provider[]>;
  listByType: (type: Providers) => Promise<Provider[]>;
  active: (userId: string, type: Providers) => Promise<void>;
  existsForNick: (type: Providers, nick: string) => Promise<boolean>;
  existsForUser: (type: Providers, userId: string) => Promise<boolean>;
}
