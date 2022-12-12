import {PrismaClient} from '@prisma/client';

export class PrismaSingleton {
  private static _instance?: PrismaClient;

  private constructor() {}

  public static get instance(): PrismaClient {
    if (!PrismaSingleton._instance) {
      PrismaSingleton._instance = new PrismaClient();
    }

    return PrismaSingleton._instance;
  }
}
