const { appEnv } = require("../../config");
const knexConfig = require('../database/knexfile');

//initialize knex
const knex = require('knex')(knexConfig[appEnv]);

module.exports = knex;