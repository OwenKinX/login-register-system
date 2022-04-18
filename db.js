const mysql = require('mysql2');

const config = require('./config/config.json');

const conn = mysql.createConnection({
  uri: config.uri
});

module.exports = conn