import Knex from 'knex';

const dataset = [{
  name: 'Common Honda bike',
  description: 'Common',
  branch: 'Honda',
  color: 'Grey'
}, {
  name: 'Rare Honda bike',
  description: 'Rare',
  branch: 'Honda',
  color: 'Blue'
}, {
  name: 'Common Yamaha bike',
  description: 'Common',
  branch: 'Yamaha',
  color: 'Grey'
}, {
  name: 'Style Yamaha bike',
  description: 'Style',
  branch: 'Yamaha',
  color: 'Red'
}, {
  name: 'Rare Yamaha bike',
  description: 'Rare',
  branch: 'Yamaha',
  color: 'Blue'
}]

export const seed = (knex: Knex) => {
  return knex('product').select().then((rslt) => {
    if (rslt.length === 0) {
      return knex('product').insert(dataset);
    }
    return null;
  });
};
