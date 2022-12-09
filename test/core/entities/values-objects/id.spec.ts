import {Id} from '#core/entities/values-objects';

describe(Id.name, () => {
  it('should create an Email instance with a valid e-mail', () => {
    const id = Id.create('123');
    expect(id).toBeInstanceOf(Id);
  });
});
