import amqplib from 'amqplib';

export class RabbitMQBase {
  private groupId: string;

  private uri: string;

  constructor(groupId: string) {
    this.uri = <string>process.env.BROKER_AMQP_RABBITMQ;
    this.groupId = groupId;
  }

  async public(
    exchange: string,
    routingKey: string,
    message: string,
    type = 'topic'
  ): Promise<void> {
    const connection = await amqplib.connect(`${this.uri}/${this.groupId}`);
    const channel = await connection.createConfirmChannel();
    await channel.assertExchange(exchange, type);
    channel.publish(exchange, routingKey || '#', Buffer.from(message));
    await channel?.close();
    await connection?.close();
  }
}
