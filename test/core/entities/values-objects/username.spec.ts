import {Username} from '#core/entities/values-objects';
import {ValidationError} from '#core/errors/validation';

describe(Username.name, () => {
  it('should create an Username instance with a valid username', () => {
    const username = Username.create('stamets');

    expect(username).toBeInstanceOf(Username);
    expect(username.value).toBe('stamets');
  });

  it('should throw when username has spaces', () => {
    expect(() => Username.create('sta mets ')).toThrow(ValidationError);
  });

  it('should throw when user has lenght more then 25 chars', () => {
    expect(() => Username.create('a'.repeat(26))).toThrow(ValidationError);
  });
});
