import {Provider} from '#core/entities/provider';

export interface IProviderRepository {
  create: (userId: string, provider: Provider) => Promise<void>;
  listByUserId: (userId: string) => Promise<Provider[]>;
  listByType: (type: string) => Promise<Provider[]>;
  active: (userId: string, type: string) => Promise<void>;
}
