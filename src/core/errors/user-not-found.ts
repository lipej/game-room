export class UserNotFound extends Error {
  code = 404;

  constructor(email: string) {
    super(`User not found with email: ${email}`);
  }
}
