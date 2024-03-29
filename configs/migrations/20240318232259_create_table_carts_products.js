/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable('carts_products', (table) => {
        table.increments('id').primary()
        table.integer('cart_id').unsigned();
        table.integer('product_id').unsigned();
        table.integer('quantity').unsigned();
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
        table.datetime('updated_at')
        
        table.foreign('cart_id').references('id').inTable('carts')
        table.foreign('product_id').references('id').inTable('products')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable('carts_products');
};
