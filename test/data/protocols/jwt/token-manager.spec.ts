import {ITokenManager} from '#core/contracts/protocols/token-manager';
import {User} from '#core/entities/user';
import {TokenManagerJWT} from '#data/protocols/token-manager/jwt-token-manager';
import {userParams} from '?test/mocks/user';

describe(TokenManagerJWT.name, () => {
  const user = User.create({...userParams, id: '2IdydHQVYRfGqdGf3ciQPR3KCL2'});
  const manager: ITokenManager = new TokenManagerJWT();

  it('should sign a token', () => {
    expect(manager.sign(user)).not.toBeUndefined();
  });

  it('should return true in verify if token is valid', () => {
    const token = manager.sign(user);

    expect(manager.verify(token)).toBeTruthy();
  });

  it('should return false in verify if token is invalid', () => {
    const token = 'invalid_token';

    expect(manager.verify(token)).toBeFalsy();
  });
});
