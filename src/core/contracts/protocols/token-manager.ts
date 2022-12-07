import {User} from '#core/entities/user';

export interface ITokenManager {
  sign: (user: User) => string;
  verify: (token: string) => boolean;
}
