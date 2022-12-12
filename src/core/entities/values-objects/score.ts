import {ValidationError} from '#core/errors/validation';
import {ValueObject} from './base';

export class Score extends ValueObject {
  constructor(public readonly value: number, shouldValidate: boolean) {
    super();
    if (shouldValidate) this.validate();
  }

  validate = (): void => {
    if (this.value < 0) throw new ValidationError('score', this.value);
  };

  static create(score: number, shouldValidate = true) {
    return new Score(score, shouldValidate);
  }
}
