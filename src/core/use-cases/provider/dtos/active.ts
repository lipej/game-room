import {Providers} from '@prisma/client';

export type ActiveProviderDTO = {
  userId: string;
  provider: Providers;
};
