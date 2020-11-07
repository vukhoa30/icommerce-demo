import { Channel, connect } from 'amqplib';

import { rpcHandler } from './rpc-functions';
import { subscriptionHandler } from './pubsub-functions';

// this queue is workers and rpc

const runRPCServer = async (rabbitmqConn: string, queue: string) => {
  const connection = await connect(rabbitmqConn);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  console.log(' [x] Awaiting RPC requests');

  channel.consume(queue, async (msg) => {
    const reqData = JSON.parse(msg!.content.toString());
    console.log('received', reqData)

    const rslt = await rpcHandler(reqData);

    channel.sendToQueue(
      msg?.properties.replyTo,
      Buffer.from(JSON.stringify(rslt)), {
      correlationId: msg?.properties.correlationId
    });

    console.log('responsed with:', rslt);
  });
}

const subscribe = async (rabbitmqConn: string, exchange: string) => {
  try {
    const connection = await connect(rabbitmqConn);
    const channel = await connection.createChannel();
    channel.assertExchange(exchange, 'fanout');
    const q = await channel.assertQueue('');
    console.log(` [X] Subscribed to exchange ${exchange}, waiting for message`);
    channel.bindQueue(q.queue, exchange, '');
    channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg!.content.toString());

      subscriptionHandler(exchange, data);

      console.log('Received from subscription:', data)
    }, {
      noAck: true
    })
  } catch (e) {
    console.log(e)
  }
}

export { runRPCServer, subscribe }
