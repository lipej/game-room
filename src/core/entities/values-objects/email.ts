import {ValidationError} from '../../errors/validation';
import {ValueObject} from './base';

export class Email extends ValueObject {
  private readonly regexValidator =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;

  private constructor(public readonly value: string) {
    super();
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
