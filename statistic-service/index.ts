import { Model } from 'objection';

import { MB_HOST } from './configs/env';
import { runRPCServer, subscribe } from './lib/amqp';
import { createKnexClient, migrate, seed } from './db';
import {
  SERVICE_QUEUE_STATISTIC,
  SERVICE_EXCHANGE_MAINAPP_QUERY
} from './configs/constants';


(async () => {
  try {
    const knex = createKnexClient();
    Model.knex(knex);
    await migrate();
    await seed();
  } catch (e) {
    console.log('Error migrating DB:', e);
  }

  runRPCServer(MB_HOST, SERVICE_QUEUE_STATISTIC)
    .catch(e => {
      console.log('RPC Server start failed!', e)
    });

  subscribe(MB_HOST, SERVICE_EXCHANGE_MAINAPP_QUERY)
    .catch(e => {
      console.log(`Subscription to ${SERVICE_EXCHANGE_MAINAPP_QUERY} failed!`, e)
    })
})();
