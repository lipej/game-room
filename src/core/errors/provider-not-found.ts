export class ProviderNotFound extends Error {
  code = 404;

  constructor(provider: string, userId: string) {
    super(`Provider ${provider} not found to userId: ${userId}`);
  }
}
