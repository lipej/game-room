import {User} from '#core/entities/user';
import {UserModel} from './models/user';

export interface IUserRepository {
  create: (user: UserModel) => Promise<void>;
  findByEmail: (email: string) => Promise<User>;
  exists: (user: Pick<UserModel, 'email' | 'username'>) => Promise<boolean>;
}
