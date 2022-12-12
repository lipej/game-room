import {EncrypterBCrypt} from '#data/protocols/encrypter/bcrypt-encrypter';

describe(EncrypterBCrypt.name, () => {
  const protocol = new EncrypterBCrypt();

  it('should encrypt a value', async () => {
    const value = 'v93021KDNSJDnsdwijoi2d';
    const result = await protocol.encrypt(value);

    expect(result).not.toEqual(value);
  });

  it('should return true when compare valid values', async () => {
    const value = 'v93021KDNSJDnsdwijoi2d';
    const encryptedValue = await protocol.encrypt(value);

    const result = await protocol.compare(value, encryptedValue);

    expect(result).toBeTruthy();
  });

  it('should return false when compare invalid values', async () => {
    const value = 'v93021KDNSJDnsdwijoi2d';
    const wrongValue = 'doqw9*@()090382';
    const encryptedValue = await protocol.encrypt(value);

    const result = await protocol.compare(wrongValue, encryptedValue);

    expect(result).toBeFalsy();
  });
});
