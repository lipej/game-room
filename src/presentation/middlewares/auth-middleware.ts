import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {BaseMiddleware} from './base';

type AuthRequests = {
  token: string;
  userEmail?: string;
};

export class AuthMiddleware extends BaseMiddleware {
  constructor(private readonly tokenManager: ITokenManager) {
    super();
  }

  execute = async (req: AuthRequests): Promise<void> => {
    const {email} = this.tokenManager.verify(req.token);

    req.userEmail = email;
  };
}
