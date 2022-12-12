import {User} from '#core/entities/user';
import {Email, Id, Password, Username} from '#core/entities/values-objects';
import {userParams} from '?test/mocks/user';

describe(User.name, () => {
  const user = User.create({
    ...userParams,
    id: '2IdydHQVYRfGqdGf3ciQPR3KCL2',
  });

  it('should create an user instace', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('should have an username', () => {
    expect(user).toHaveProperty(
      'username',
      Username.create(userParams.username).value
    );
  });

  it('should have an email', () => {
    expect(user).toHaveProperty('email', Email.create(userParams.email).value);
  });

  it('should have an password', () => {
    expect(user).toHaveProperty(
      'password',
      Password.create(userParams.password).value
    );
  });

  it('should have an id', () => {
    expect(user).toHaveProperty(
      'id',
      Id.create('2IdydHQVYRfGqdGf3ciQPR3KCL2').value
    );
  });
});
