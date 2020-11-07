import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config()

const parseIntGracefully = (str: string | undefined) => {
  try {
    return str && parseInt(str)
  } catch(e) {
    return undefined
  }
}

export const MB_HOST = process.env.MB_HOST || 'amqp://localhost';
export const APP_PORT = parseIntGracefully(process.env.APP_PORT) || 3000;