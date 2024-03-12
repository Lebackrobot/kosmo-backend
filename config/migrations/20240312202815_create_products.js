/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.float('price').notNullable()
        table.integer('stock').notNullable()
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
        table.datetime('updated_at')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('products')
};
