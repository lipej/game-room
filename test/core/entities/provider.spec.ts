import {Provider} from '#core/entities/provider';

describe(Provider.name, () => {
  it('should create a provider', () => {
    const provider = Provider.create('test');

    expect(provider).toBeInstanceOf(Provider);
  });

  it('should have a nick prop', () => {
    const provider = Provider.create('test');

    expect(provider.nick).toBe('test');
  });

  it('should have a type prop', () => {
    const provider = Provider.create('test');

    expect(provider.type).toBe('PSN');
  });

  it('should have a isActive prop', () => {
    const provider = Provider.create('test');

    expect(provider.isActive).toBe(false);
  });

  it('should have a score prop', () => {
    const provider = Provider.create('test');

    expect(provider.score).toBe(0);
  });
});
