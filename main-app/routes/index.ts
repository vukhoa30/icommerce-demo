import express from 'express';
import { createClient, sendRPCData } from '../lib/amqp';
import { MB_HOST } from '../configs/env';
import { SERVICE_QUEUE_PRODUCT } from '../configs/constants';

const router = express.Router();

let channel: any;
(async() => {
  channel = await createClient(MB_HOST);
  // const data = {
  //   fnName: 'getProducts',
  //   data: {
  //     filter: { 'color': 'Yellow' },
  //     sort: { 'id': 'desc' }
  //   }
  // }

  // console.log('Message sent:', data);
  // const response = await sendRPCData(channel, data, 'product_service');
  // console.log('Message received:', response);
})();

router.get('/products/:id', async (req, res) => {
  const rslt = await sendRPCData(channel, {
    fnName: 'getProduct',
    data: { id: req.params.id }
  }, SERVICE_QUEUE_PRODUCT);
  res.json(rslt);
});

router.get('/products', async (req, res) => {
  // @ts-ignore bcs we assume this query is URI encoded
  const filter = req.query.filter ? JSON.parse(decodeURI(req.query.filter)) : null;
  // @ts-ignore
  const sort = req.query.sort ? JSON.parse(decodeURI(req.query.sort)) : null;
  const rslt = await sendRPCData(channel, {
    fnName: 'getProducts',
    data: { filter, sort }
  }, SERVICE_QUEUE_PRODUCT);
  res.json(rslt);
});

export default router;
