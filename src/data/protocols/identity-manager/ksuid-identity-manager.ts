import {IIdentityManager} from '#core/contracts/protocols/identity-manager';
import KSUID from 'ksuid';

export class IdentityManagerKsuid implements IIdentityManager {
  generate = () => KSUID.randomSync().string;
}
