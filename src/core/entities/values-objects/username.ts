import {ValidationError} from '#core/errors/validation';
import {ValueObject} from './base';

export class Username extends ValueObject {
  private readonly MAX_USERNAME_SIZE = 25;
  private readonly regexValidator = /\s/;

  private constructor(public readonly value: string) {
    super();
    this.valitate();
  }

  static create(username: string) {
    return new Username(username);
  }

  valitate(): void {
    if (
      this.regexValidator.test(this.value) ||
      this.value.length > this.MAX_USERNAME_SIZE
    )
      throw new ValidationError('username', this.value);
  }
}
