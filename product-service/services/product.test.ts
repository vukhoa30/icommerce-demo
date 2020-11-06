import { Model } from 'objection';

import {
  createKnexClient,
  migrate,
  seed
} from '../db';
import { getProduct, getProducts } from './product';

let knex: any;
let anExistingProductId: number;

describe('product service should work correctly', () => {
  beforeAll(async (done) => {
    try {
      knex = createKnexClient();
      Model.knex(knex);
      await migrate();
      await seed();
      done();
    } catch (e) {
      console.log('Error migrating DB:', e);
    }
  })

  test('get all products', async (done) => {
    const rslt: any = await getProducts({}, {});
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((p: any, idx: number) => {
      expect(p.id).not.toBeNull();
      expect(p.name).not.toBeNull();
      anExistingProductId = p.id;
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get products with filters', async (done) => {
    const rslt: any = await getProducts({ name: 'bike', color: 'Grey' }, {});
    expect(rslt.length).toBeGreaterThan(0);
    rslt.forEach((p: any, idx: number) => {
      expect(p.name).toContain('bike');
      expect(p.color).toContain('Grey');
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get products with sorts', async (done) => {
    const rslt: any = await getProducts({}, { name: 'asc' });
    expect(rslt.length).toBeGreaterThan(0);
    const rsltNames = rslt.map((r: any) => r.name);
    const sortedRsltNames = rsltNames.sort();
    expect(rsltNames).toEqual(sortedRsltNames);
    done();
  })

  test('get product query statistics with filters, sorts', async (done) => {
    const rslt: any = await getProducts({ branch: 'Yamaha' }, { name: 'asc' });
    expect(rslt.length).toBeGreaterThan(0);
    const rsltNames = rslt.map((r: any) => r.name);
    const sortedRsltNames = rsltNames.sort();
    expect(rsltNames).toEqual(sortedRsltNames);
    rslt.forEach((p: any, idx: number) => {
      expect(p.branch).toBe('Yamaha');
      if (idx === rslt.length - 1) {
        done();
      }
    })
  })

  test('get product detail view statistic with from-to', async (done) => {
    const rslt: any = await getProduct(anExistingProductId);
    expect(rslt.id).not.toBeNull();
    expect(rslt.name).not.toBeNull();
    done();
  })

  afterAll(() => {
    knex.destroy();
  })
})
