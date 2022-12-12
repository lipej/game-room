import {ValidationError} from '#core/errors/validation';
import {ValueObject} from './base';

export class ProviderType extends ValueObject {
  constructor(public readonly value: string, shouldValidate: boolean) {
    super();
    if (shouldValidate) this.validate();
  }

  validate = (): void => {
    if (this.value !== 'PSN') throw new ValidationError('type', this.value);
  };

  static create(type: string, shouldValidate = true) {
    return new ProviderType(type, shouldValidate);
  }
}
