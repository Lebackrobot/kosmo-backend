/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable('stocks', (table) => {
        table.increments('id').primary()
        table.integer('quantity').unsigned();
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('id').inTable('products')
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
        table.datetime('updated_at')
    })

    .then(() => {
        knex.insert({
            product_id: 1,
            quantity: 200,
        }).into('stocks')

        .then(() => {
            return knex.insert({
                product_id: 2,
                quantity: 300,
            }).into('stocks')
        })

        .then(() => {
            return knex.insert({
                product_id: 3,
                quantity: 400,
            }).into('stocks')
        })
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable('stocks');
};
