import { Model } from 'objection';

import { MB_HOST } from './configs/env';
import { runRPCServer } from './lib/amqp';
import { createKnexClient, migrate } from './db';

// this queue is workers and rpc
const queue = 'product_service';

(async () => {
  try {
    const knex = createKnexClient();
    await migrate(knex);
    Model.knex(knex);
  } catch (e) {
    console.log('Error migrating DB:', e)
  }

  runRPCServer(MB_HOST, queue)
    .catch(e => {
      console.log('RPC Server start failed!', e)
    })
})();
