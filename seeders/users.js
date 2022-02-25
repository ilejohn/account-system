/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Martin Albert', email: "martin@example.com"},
    {id: 2, name: 'Victoria Smith', email: "victoria@example.com"},
    {id: 3, name: 'John Doe', email: "john@example.com"},
    {id: 4, name: 'Deborah Peters', email: "deborah@example.com"}
  ]);
};
