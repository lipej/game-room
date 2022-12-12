import {IdentityManagerKsuid} from '#data/protocols/identity-manager/ksuid-identity-manager';
import KSUID from 'ksuid';

describe(IdentityManagerKsuid.name, () => {
  it('should generate a valid id', () => {
    const id = new IdentityManagerKsuid().generate();
    expect(KSUID.isValid(KSUID.parse(id).raw)).toBeTruthy();
  });
});
