import {ErrorBase} from './base';

export class ValidationError extends ErrorBase {
  code = 400;

  constructor(param: string, value: unknown) {
    super(`The parameter: '${param}', with value: '${value}', was invalid`);
  }
}
