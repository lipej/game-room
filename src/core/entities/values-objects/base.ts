export abstract class BaseValueObject {
  abstract value: string | number;

  abstract valitate(): void;
}
