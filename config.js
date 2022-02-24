require("dotenv").config({path: '.env'});

module.exports = {
  port: process.env.APP_PORT,
  appName: process.env.APP_NAME || "Node Api",
  appEnv: process.env.APP_ENV || "development",
  appKey: process.env.APP_KEY,
  appUrl: process.env.APP_URL,
  dbClient: process.env.DB_CLIENT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
};
