import {User} from '#core/entities/user';

export type DecodedToken = {email: string};

export interface ITokenManager {
  sign: (user: User) => string;
  verify: (token: string) => DecodedToken;
}
