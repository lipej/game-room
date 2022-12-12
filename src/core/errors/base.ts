export abstract class ErrorBase extends Error {
  abstract code: number;

  constructor(message: string) {
    super(message);
  }
}
