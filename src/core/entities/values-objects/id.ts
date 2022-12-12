import {ValueObject} from './base';

export class Id extends ValueObject {
  private constructor(public readonly value: string) {
    super();
  }

  static create = (value: string) => new Id(value);
}
