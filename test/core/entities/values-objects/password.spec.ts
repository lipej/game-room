import {Password} from '#core/entities/values-objects';
import {PasswordValidation} from '#core/errors/password-validation';
import {userParams} from '?test/mocks/user';

describe(Password.name, () => {
  it('should create an Password instance with a valid password', () => {
    const pass = Password.create(userParams.password);
    expect(pass).toBeInstanceOf(Password);
  });

  it('should throw error when password is invalid [only lower case]', () => {
    expect(() => Password.create('testpass')).toThrow(PasswordValidation);
  });

  it('should throw error when password is invalid [only upper case]', () => {
    expect(() => Password.create('TESTPASS')).toThrow(PasswordValidation);
  });

  it('should throw error when password is invalid [only digit]', () => {
    expect(() => Password.create('12345678')).toThrow(PasswordValidation);
  });

  it('should throw error when password is invalid [big size]', () => {
    expect(() => Password.create(userParams.password.repeat(5))).toThrow(
      PasswordValidation
    );
  });

  it('should throw error when password is invalid [too short]', () => {
    expect(() => Password.create('dP@SS1')).toThrow(PasswordValidation);
  });
});
