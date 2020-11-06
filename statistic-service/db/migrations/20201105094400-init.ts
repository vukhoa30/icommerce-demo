import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('product_query', (table) => {
    table.increments('id').primary();
    table.integer('productid').nullable();
    table.json('filter').nullable();
    table.json('sort').nullable();
    table.dateTime('createdat').defaultTo(knex.fn.now());
  })
}

export const down = async (knex: Knex) => {
  return knex.schema.dropTable('product_query');
}
