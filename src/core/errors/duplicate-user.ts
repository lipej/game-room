import {ErrorBase} from './base';

export class DuplicateUserError extends ErrorBase {
  code = 409;

  constructor() {
    super('Already exists an user with this e-mail or username');
  }
}
