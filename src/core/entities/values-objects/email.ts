import {ValidationError} from '../../errors/validation';
import {BaseValueObject} from './base';

export class Email extends BaseValueObject {
  public readonly value: string;

  private readonly regexValidator: RegExp =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

  private constructor(email: string) {
    super();
    this.value = email;
    this.valitate();
  }

  static create(email: string) {
    return new Email(email);
  }

  valitate(): void {
    if (!this.regexValidator.test(this.value))
      throw new ValidationError('email', this.value);
  }
}
