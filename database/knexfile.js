require("dotenv").config({path: '../.env'});
const {dbClient, dbHost, dbPort, dbUser, dbPassword, dbDatabase } = require("../config");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: dbClient,
    connection: {
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbDatabase
    },
    migrations: {
      tableName: 'migrations'
    },
    seeds: {
      directory: '../seeders'
    }
  },

};
