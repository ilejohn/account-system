/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('transactions', function (table) {
      table.increments('id');
      table.integer('account_id').unsigned().notNullable();
      table.foreign('account_id').references('id').inTable('accounts').onUpdate('CASCADE').onDelete('CASCADE');
      table.string('type').checkIn(['CREDIT','DEBIT']);
      table.integer('debit');
      table.integer('credit');
      table.text('narration', 'longtext');
      table.string('status').checkIn(['SUCCESS', 'FAILED', 'PENDING']);
      table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('transactions');
};
