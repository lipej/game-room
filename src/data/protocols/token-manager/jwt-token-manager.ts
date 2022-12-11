import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {User} from '#core/entities/user';
import * as jwt from 'jsonwebtoken';

export class TokenManagerJWT implements ITokenManager {
  private readonly PRIVATE_KEY: jwt.Secret = <string>(
    process.env.JWT_PRIVATE_KEY
  );

  sign = (user: User): string =>
    jwt.sign(this.genPayload(user.email), this.PRIVATE_KEY, {
      expiresIn: process.env.TOKEN_MAX_AGE,
      issuer: process.env.JWT_ISSUER,
    });

  verify = (token: string): boolean => {
    try {
      jwt.verify(token, this.PRIVATE_KEY);
      return true;
    } catch (err) {
      return false;
    }
  };

  private genPayload = (email: string): {email: string} => ({email});
}
