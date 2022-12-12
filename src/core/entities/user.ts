import {Provider} from './provider';
import {Email, Password, Username} from './values-objects';
import {Id} from './values-objects/id';

export type UserParams = {
  username: string;
  email: string;
  password: string;
  id: string;
};

export class User {
  private readonly _id: Id;
  private readonly _username: Username;
  private readonly _email: Email;
  private readonly _password: Password;
  private _providers?: Provider[];

  private constructor(
    {username, email, password, id}: UserParams,
    shouldValidate: boolean
  ) {
    this._username = Username.create(username, shouldValidate);
    this._email = Email.create(email, shouldValidate);
    this._password = Password.create(password, shouldValidate);
    this._id = Id.create(id);
  }

  static create = (params: UserParams, shouldValidate = true) =>
    new User(params, shouldValidate);

  get id(): string {
    return this._id.value;
  }

  get username(): string {
    return this._username.value;
  }

  get password(): string {
    return this._password.value;
  }

  get email(): string {
    return this._email.value;
  }
}
