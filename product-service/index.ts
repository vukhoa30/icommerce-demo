import { connect } from 'amqplib';

import { MB_HOST } from './configs/env';
import a from './db';

// this queue is workers and rpc
const queue = 'product_service';

// expected data: {
//   name: 'getProducts',
//   filter: {

//   }
// }

(async() => {
  try {
    const connection = await connect(MB_HOST);
    const channel = await connection.createChannel();
    channel.assertQueue(queue, {
      durable: false
    })
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    await channel.consume(queue, (msg) => {
      const data = JSON.parse(msg!.toString());
    });

  } catch(e) {
    console.log('oopsy daisy!', e)
  }
})()
