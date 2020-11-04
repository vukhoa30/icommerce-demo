import { connect } from 'amqplib';

import { rpcHandler } from './rpc-functions';

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

    channel.ack(msg!);
    console.log('responsed with:', rslt);
  });
}

export { runRPCServer }
