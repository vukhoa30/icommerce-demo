import express from 'express';
import { createClient, sendRPCData, publish } from '../lib/amqp';
import { MB_HOST } from '../configs/env';
import {
  SERVICE_QUEUE_PRODUCT,
  SERVICE_QUEUE_STATISTIC
} from '../configs/constants';
import {
  SERVICE_EXCHANGE_MAINAPP_QUERY
} from '../configs/constants';
import { Channel } from 'amqplib';

const router = express.Router();

let rpcChannel: Channel;
let pubChannel: Channel;
(async() => {
  rpcChannel = await createClient(MB_HOST);
  pubChannel = await createClient(MB_HOST);
})();

router.get('/products/:id', async (req, res) => {
  const productId = req.params.id
  const rslt = await sendRPCData(rpcChannel, {
    fnName: 'getProduct',
    data: { id: productId }
  }, SERVICE_QUEUE_PRODUCT);
  publish(pubChannel, { productId }, SERVICE_EXCHANGE_MAINAPP_QUERY);
  res.json(rslt);
});

router.get('/products', async (req: any, res) => {
  const filter = req.query.filter ? JSON.parse(decodeURI(req.query.filter)) : null;
  const sort = req.query.sort ? JSON.parse(decodeURI(req.query.sort)) : null;

  const rslt = await sendRPCData(rpcChannel, {
    fnName: 'getProducts',
    data: { filter, sort }
  }, SERVICE_QUEUE_PRODUCT);
  publish(pubChannel, { filter, sort }, SERVICE_EXCHANGE_MAINAPP_QUERY);
  res.json(rslt);
});

router.get('/statistic/products/query', async (req: any, res) => {
  const filter = req.query.filter ? JSON.parse(decodeURI(req.query.filter)) : null;
  const sort = req.query.sort ? JSON.parse(decodeURI(req.query.sort)) : null;
  const from = req.query.from ? JSON.parse(decodeURI(req.query.from)) : null;
  const to = req.query.to ? JSON.parse(decodeURI(req.query.to)) : null;

  const rslt = await sendRPCData(rpcChannel, {
    fnName: 'getProductQueryStatistic',
    data: { filter, sort, from, to }
  }, SERVICE_QUEUE_STATISTIC);
  res.json(rslt);
})

router.get('/statistic/products/detail-view', async (req: any, res) => {
  const ids = req.query.ids ? JSON.parse(decodeURI(req.query.ids)) : null;
  const from = req.query.from ? JSON.parse(decodeURI(req.query.from)) : null;
  const to = req.query.to ? JSON.parse(decodeURI(req.query.to)) : null;

  const rslt = await sendRPCData(rpcChannel, {
    fnName: 'getProductDetailViewStatistic',
    data: { ids, from, to }
  }, SERVICE_QUEUE_STATISTIC);
  res.json(rslt);
})

export default router;
