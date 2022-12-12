import {ValidationError} from '../../errors/validation';
import {ValueObject} from './base';

export class Email extends ValueObject {
  private readonly regexValidator =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

  private constructor(public readonly value: string, shouldValidate: boolean) {
    super();
    if (shouldValidate) this.validate();
  }

  static create(email: string, shouldValidate = true) {
    return new Email(email, shouldValidate);
  }

  validate(): void {
    if (!this.regexValidator.test(this.value))
      throw new ValidationError('email', this.value);
  }
}
