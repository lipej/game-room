import {INotifyProvider} from '#core/contracts/external-services/notify-provider';
import {RabbitMQBase} from './base';

export class NotifyProviderRabbitMQ
  extends RabbitMQBase
  implements INotifyProvider
{
  private readonly exchange: string = <string>(
    process.env.NOTIFY_PROVIDER_EXCHANGE
  );

  publish = async (userId: string, provider: 'PSN'): Promise<void> => {
    await this.public(this.exchange, provider, JSON.stringify({userId}));
  };
}
