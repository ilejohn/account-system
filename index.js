const express = require("express");
const { port, appEnv } = require("./config");
const knexConfig = require('./database/knexfile');

//initialize knex
const knex = require('knex')(knexConfig[appEnv]);

const apiRoutes = require("./routes");
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static("public"));

app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`***** \nServer running on port ${port}\n*****`);
});
