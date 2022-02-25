/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('accounts', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('available_balance').defaultTo(0);
      table.integer('pending_debit_balance').defaultTo(0);
      table.integer('pending_credit_balance').defaultTo(0);
      table.timestamps(true, true, true);
      table.check('?? >= ??', ['available_balance', 0]);
      table.check('?? >= ??', ['pending_debit_balance', 0]);
      table.check('?? >= ??', ['pending_credit_balance', 0]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('accounts');
};
