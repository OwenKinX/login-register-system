const mysql = require('mysql2');

const config = require('./config/config.json');

const conn = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port
});

module.exports = conn
