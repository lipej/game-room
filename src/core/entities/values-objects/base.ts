export abstract class ValueObject {
  abstract value: string | number;

  protected validate?(): void;
}
