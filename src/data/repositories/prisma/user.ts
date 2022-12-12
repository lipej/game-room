import {UserModel} from '#core/contracts/repositories/models/user';
import {IUserRepository} from '#core/contracts/repositories/user';
import {User} from '#core/entities/user';
import {UserNotFound} from '#core/errors/user-not-found';
import {PrismaClient} from '@prisma/client';

export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly client: PrismaClient) {}

  create = async (user: UserModel): Promise<void> => {
    await this.client.user.create({data: user});
  };

  findByEmail = async (email: string): Promise<User> => {
    const result = await this.client.user.findUnique({where: {email}});

    if (!result) throw new UserNotFound(email);

    return this.toEntity(result);
  };

  exists = async ({
    email,
    username,
  }: Pick<UserModel, 'email' | 'username'>): Promise<boolean> =>
    !!(await this.client.user.findFirst({
      where: {OR: [{email}, {username}]},
    }));

  private toEntity = (user: UserModel): User => User.create(user, false);
}
