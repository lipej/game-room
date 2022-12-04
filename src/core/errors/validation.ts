export class ValidationError extends Error {
  constructor(param: string, value: unknown) {
    super(`The parameter:  '${param}', with value: '${value}', was invalid`);
  }
}
