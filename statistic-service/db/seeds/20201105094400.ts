import Knex from 'knex';

const dataset = [{
  productid: 1
}, {
  productid: 1
}, {
  filter: {
    color: 'Gray'
  }
}, {
  filter: {
    color: 'Gray',
    name: 'bike'
  }
}, {
  filter: {
    color: 'Gray',
    name: 'bike'
  },
  sort: {
    productid: 'asc'
  }
}, {
  productid: 2
}]

export const seed = (knex: Knex) => {
  return knex('product_query').select().then((rslt) => {
    if (rslt.length === 0) {
      return knex('product_query').insert(dataset);
    }
    return null;
  });
};
