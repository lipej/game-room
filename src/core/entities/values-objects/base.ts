export abstract class ValueObject {
  abstract value: string | number;

  abstract validate(): void;
}
