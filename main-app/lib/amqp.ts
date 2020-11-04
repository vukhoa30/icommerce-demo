import { connect, Message, Channel } from 'amqplib';
import { EventEmitter } from 'events';

import { generateId } from './functions';

const queue = 'product_service'; // this queue is workers and rpc
const REPLY_TO = 'amq.rabbitmq.reply-to';

const createClient = async (rabbitmqConn: string) => {
  const connection = await connect(rabbitmqConn);
  const channel: any = await connection.createChannel();

  channel.responseEmitter = new EventEmitter();
  channel.responseEmitter.setMaxListeners(0);

  channel.consume(REPLY_TO, (msg: Message) => {
    channel.responseEmitter.emit(
      msg?.properties.correlationId,
      msg?.content.toString('utf8')
    );
  }, {
    noAck: true
  });
  return channel;
}

const sendRPCData = (channel: any, data: any, rpcQueue: any) =>
  new Promise(resolve => {
    const correlationId = generateId();
    channel.responseEmitter.once(correlationId, (resData: any) => (resolve(JSON.parse(resData))));
    channel.sendToQueue(rpcQueue, Buffer.from(JSON.stringify(data)), {
      correlationId,
      replyTo: REPLY_TO
    });
  });

export { createClient, sendRPCData };
