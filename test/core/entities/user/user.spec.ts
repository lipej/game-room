import {User} from '#core/entities/user';
import {Email, Username} from '#core/entities/values-objects';
import {userParams} from '?test/mocks/user';

describe(User.name, () => {
  it('should create an user instace', () => {
    const user = User.create(userParams);

    expect(user).toBeInstanceOf(User);
  });

  it('should have an username', () => {
    const user = User.create(userParams);

    expect(user).toHaveProperty(
      'username',
      Username.create(userParams.username)
    );
  });

  it('should have an email', () => {
    const user = User.create(userParams);

    expect(user).toHaveProperty('email', Email.create(userParams.email));
  });
});
