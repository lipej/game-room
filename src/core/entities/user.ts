import {Email, Password, Username} from './values-objects';

export type UserParams = {
  username: string;
  email: string;
  password: string;
};

export class User {
  private readonly _username: Username;
  private readonly _email: Email;
  private readonly _password: Password;

  private constructor(
    {username, email, password}: UserParams,
    shouldValidate: boolean
  ) {
    this._username = Username.create(username, shouldValidate);
    this._email = Email.create(email, shouldValidate);
    this._password = Password.create(password, shouldValidate);
  }

  static create = (params: UserParams, shouldValidate = true) =>
    new User(params, shouldValidate);

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
