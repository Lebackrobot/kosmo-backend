/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.insert({
        name: 'user',
        email: 'user@user',
        password: '123'
    }).into('users')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable('users').then(() => {
        return knex.schema.createTable('users', (table) => {
            table.increments('id').primary()
            table.string('name').notNullable()
            table.string('email').notNullable().unique()
            table.string('password').notNullable()
            table.datetime('created_at').notNullable().defaultTo(knex.fn.now())
            table.datetime('updated_at')
        })
    })
};
