import {Score} from '#core/entities/values-objects';
import {ValidationError} from '#core/errors/validation';

describe(Score.name, () => {
  it('should create an Score instance with a valid score', () => {
    const score = Score.create(1000);
    expect(score).toBeInstanceOf(Score);
  });

  it('should throw error when score is < 0', () => {
    expect(() => Score.create(-10)).toThrow(ValidationError);
  });
});
