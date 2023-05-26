require("dotenv").config();
const { ENV, PORT } = process.env;

const SERVER_CONFIG = {
  ssl: true,
  port: PORT,
  env: ENV,
};

module.exports = SERVER_CONFIG;