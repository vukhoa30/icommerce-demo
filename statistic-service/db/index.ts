import Knex from 'knex';
import { resolve } from 'path';

import {
  DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, ENV
} from '../configs/env';

const createKnexClient = () => {
  return Knex({
    client: DB_DIALECT,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: ENV === 'test' ? `test${DB_NAME}` : DB_NAME
    },
    migrations: {
      extension: ENV === 'production' ? 'js' : 'ts',
      directory: resolve(__dirname, 'migrations')
    }
  })
};

const migrate = async () => {
  const knex = createKnexClient();
  try {
    await knex.migrate.latest();
    console.log('Migration completed')
  } catch (e) {
    console.log('Error during migration:', e);
  } finally {
    knex.destroy();
  }
}

export { createKnexClient, migrate }
