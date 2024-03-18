/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.float('price').notNullable()
        table.integer('stock').notNullable()
        table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
        table.datetime('updated_at')
    })
    
        .then(() => {
            knex.insert({
                name: 'chocolate',
                price: 5.50,
                stock: 5
            }).into('products')

        .then(() => {
            return knex.insert({
                name: 'paçoca',
                price: 7.80,
                stock: 20
            }).into('products')
        })

        .then(() => {
            return knex.insert({
                name: 'MMs',
                price: 4.15,
                stock: 15
            }).into('products')
        })
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable('products')
};
