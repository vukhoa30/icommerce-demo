import { Model } from 'objection';

import {
  createKnexClient,
  migrate
} from '../db';
import {
  getProductQueryStatistic,
  getProductDetailViewStatistic,
  addProductStatistic
} from './product-statistic';

let knex: any;
const statisticDataset = [
  {},
  { filter: { color: 'Grey' } },
  { filter: { color: 'Grey', name: 'bike' } },
  { filter: { color: 'Grey', name: 'bike' }, sort: { name: 'desc' } },
  { sort: { name: 'asc' } },
  { productId: 1 },
  { productId: 2 }
];

describe('product stastic service should work correctly', () => {
  beforeAll(async () => {
    try {
      knex = createKnexClient();
      Model.knex(knex);
      await migrate();
    } catch (e) {
      console.log('Error migrating DB:', e);
    }
  })

  test('add various product statistics', async (done) => {
    statisticDataset.forEach(async (s, idx) => {
      const rslt: any = await addProductStatistic(s);
      expect(rslt.id).not.toBeNull();
      if (idx === statisticDataset.length - 1) {
        done();
      }
    })
  })

  test('get all product query statistics', async (done) => {
    const rslt: any = await getProductQueryStatistic();
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((s: any, idx: number) => {
      expect(s.productId).toBeNull();
      expect(s.name).not.toBeNull();
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get product query statistics with filters', async (done) => {
    const rslt: any = await getProductQueryStatistic(['color', 'name']);
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((s: any, idx: number) => {
      expect(s.filter && s.filter.color).not.toBeFalsy();
      expect(s.filter && s.filter.name).not.toBeFalsy();
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get product query statistics with sorts', async (done) => {
    const rslt: any = await getProductQueryStatistic(undefined, ['name']);
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((s: any, idx: number) => {
      expect(s.sort && s.sort.name).not.toBeFalsy();
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get product query statistics with filters, sorts, from-to', async (done) => {
    const from = new Date(Date.now() - 1000*60*60*24);
    const to = new Date();
    const rslt: any = await getProductQueryStatistic(['color'], ['name'], from, to);
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((s: any, idx: number) => {
      expect(s.filter && s.filter.color).not.toBeFalsy();
      expect(s.sort && s.sort.name).not.toBeFalsy();
      expect(s.createdAt >= from).toBe(true);
      expect(s.createdAt <= to).toBe(true);
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get product detail view statistic with from-to', async (done) => {
    const from = new Date(Date.now() - 1000*60*60*24);
    const to = new Date();
    const rslt: any = await getProductDetailViewStatistic([1], from, to); // 1 is in the dataset "productId: 1"
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((s: any, idx: number) => {
      expect(s.filter).toBeFalsy();
      expect(s.sort).toBeFalsy();
      expect(s.createdAt >= from).toBe(true);
      expect(s.createdAt <= to).toBe(true);
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  afterAll(() => {
    knex.destroy();
  })
})
