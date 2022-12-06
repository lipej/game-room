import {IEncrypter} from '#core/contracts/protocols/encrypter';
import * as bcrypt from 'bcrypt';

export class EncrypterBCrypt implements IEncrypter {
  private readonly salt: number = 10;

  encrypt = async (password: string): Promise<string> =>
    await bcrypt.hash(password, this.salt);

  compare = async (
    password: string,
    encryptedPassword: string
  ): Promise<boolean> => await bcrypt.compare(password, encryptedPassword);
}
