/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('accounts', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('available_balance').checkPositive().defaultTo(0);
      table.integer('pending_debit_balance').checkPositive().defaultTo(0);
      table.integer('pending_credit_balance').checkPositive().defaultTo(0);
      table.timestamps(true, true, true);
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
