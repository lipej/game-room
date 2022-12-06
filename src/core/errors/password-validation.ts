import {ValidationError} from './validation';

export class PasswordValidation extends ValidationError {
  constructor(lenght: number) {
    super('password', '#'.repeat(lenght));
  }
}
