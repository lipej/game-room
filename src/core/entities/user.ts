import {Email, Username} from './values-objects';

export type UserParams = {
  username: string;
  email: string;
};

export class User {
  public readonly username: Username;
  public readonly email: Email;

  private constructor({username, email}: UserParams) {
    this.username = Username.create(username);
    this.email = Email.create(email);
  }

  static create = (params: UserParams) => new User(params);
}
