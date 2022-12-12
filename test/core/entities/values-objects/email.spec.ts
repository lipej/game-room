import {Email} from '#core/entities/values-objects';
import {ValidationError} from '#core/errors/validation';

describe(Email.name, () => {
  it('should create an Email instance with a valid e-mail', () => {
    const email = Email.create('test@example.com');
    expect(email).toBeInstanceOf(Email);
  });

  it('should throw error when email is invalid', () => {
    expect(() => Email.create('test#example')).toThrow(ValidationError);
  });
});
