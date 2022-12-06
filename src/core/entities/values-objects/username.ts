import {ValidationError} from '#core/errors/validation';
import {ValueObject} from './base';

export class Username extends ValueObject {
  private readonly MAX_USERNAME_SIZE = 25;
  private readonly regexValidator = /\s/;

  private constructor(public readonly value: string, shouldValidate: boolean) {
    super();
    if (shouldValidate) this.validate();
  }

  static create(username: string, shouldValidate = true) {
    return new Username(username, shouldValidate);
  }

  validate(): void {
    if (
      this.regexValidator.test(this.value) ||
      this.value.length > this.MAX_USERNAME_SIZE
    )
      throw new ValidationError('username', this.value);
  }
}
