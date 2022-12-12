import {Username} from './values-objects';
import {ProviderType, Score} from './values-objects';

export type Providers = 'PSN';

export class Provider {
  private readonly _nick: Username;
  private readonly _type: ProviderType;
  private readonly _isActive: boolean;
  private readonly _score: Score;

  private constructor(
    nick: string,
    type: Providers,
    isActive: boolean,
    score: number
  ) {
    this._nick = Username.create(nick);
    this._type = ProviderType.create(type);
    this._isActive = isActive;
    this._score = Score.create(score);
  }

  static create = (
    nick: string,
    type = 'PSN' as const,
    isActive = false,
    score = 0
  ) => new Provider(nick, type, isActive, score);

  get nick() {
    return this._nick.value;
  }

  get type(): Providers {
    return this._type.value as Providers;
  }

  get isActive() {
    return this._isActive;
  }

  get score() {
    return this._score.value;
  }
}
