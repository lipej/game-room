import {PasswordValidation} from '#core/errors/password-validation';
import {ValueObject} from './base';

export class Password extends ValueObject {
  private readonly regexValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/;

  private constructor(public readonly value: string, shouldValidate: boolean) {
    super();
    if (shouldValidate) this.validate();
  }

  static create(password: string, shouldValidate = true) {
    return new Password(password, shouldValidate);
  }

  validate = (): void => {
    if (!this.regexValidator.test(this.value))
      throw new PasswordValidation(this.value.length);
  };
}
