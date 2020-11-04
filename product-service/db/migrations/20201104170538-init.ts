import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('product', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.string('branch');
    table.string('color');
  })
}

export const down = async (knex: Knex) => {
  return knex.schema.dropTable('product');
}
