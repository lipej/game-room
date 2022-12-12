import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {TokenManagerJWT} from '#data/protocols/token-manager/jwt-token-manager';
import {AuthMiddleware} from '#presentation/middlewares/auth-middleware';

export class AuthMiddlewareFactory {
  static create = (): AuthMiddleware => {
    const tokenManager: ITokenManager = new TokenManagerJWT();
    return new AuthMiddleware(tokenManager);
  };
}
