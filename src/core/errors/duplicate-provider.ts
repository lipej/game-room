import {ErrorBase} from './base';

export class DuplicateProviderError extends ErrorBase {
  code = 409;

  constructor(provider: string, nick?: string) {
    super(
      nick
        ? `Someone already register the nick: ${nick}, for provider ${provider}`
        : `You already register a nick for provider ${provider}`
    );
  }
}
