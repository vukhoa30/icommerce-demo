import * as dotenv from 'dotenv';

dotenv.config();

const parseIntGracefully = (str: string | undefined) => {
  try {
    return str && parseInt(str)
  } catch(e) {
    return undefined
  }
}

export const DB_DIALECT = process.env.DB_DIALECT || 'pg';
export const DB_HOST=  process.env.DB_HOST || 'localhost';
export const DB_USERNAME= process.env.DB_USERNAME;
export const DB_PASSWORD= process.env.DB_PASSWORD;
export const DB_PORT = parseIntGracefully(process.env.DB_PORT) || 5432;
export const DB_NAME = process.env.DB_NAME || 'serviceproduct';
export const MB_HOST = process.env.MB_HOST || 'amqp://localhost';
export const ENV = process.env.NODE_ENV;
