import Knex from 'knex';
import { resolve } from 'path';

import {
  DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME
} from '../configs/env';

const createKnexClient = () => {
  return Knex({
    client: DB_DIALECT,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME
    },
    migrations: {
      extension: process.env.NODE_ENV === 'production' ? 'js' : 'ts',
      directory: resolve(__dirname, 'migrations')
    }
  })
};

const migrate = async (knex: Knex) => {
  const knexClient = createKnexClient();
  try {
    await knexClient.migrate.latest();
    console.log('Migration completed')
  } catch (e) {
    console.log('Error during migration:', e);
  } finally {
    knexClient.destroy();
  }
}

export { createKnexClient, migrate }
