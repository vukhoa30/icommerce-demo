import { Model } from 'objection';

import { MB_HOST } from './configs/env';
import { runRPCServer } from './lib/amqp';
import { createKnexClient, migrate } from './db';
import { SERVICE_QUEUE_PRODUCT } from './configs/constants';

(async () => {
  try {
    const knex = createKnexClient();
    await migrate(knex);
    Model.knex(knex);
  } catch (e) {
    console.log('Error migrating DB:', e)
  }

  runRPCServer(MB_HOST, SERVICE_QUEUE_PRODUCT)
    .catch(e => {
      console.log('RPC Server start failed!', e)
    })
})();
