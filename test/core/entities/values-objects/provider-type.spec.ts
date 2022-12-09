import {ProviderType} from '#core/entities/values-objects';
import {ValidationError} from '#core/errors/validation';

describe(ProviderType.name, () => {
  it('should create an ProviderType instance with a valid provider', () => {
    const provider = ProviderType.create('PSN');
    expect(provider).toBeInstanceOf(ProviderType);
  });

  it('should throw error when ProviderType is invalid', () => {
    expect(() => ProviderType.create('NINTENDON')).toThrow(ValidationError);
  });
});
