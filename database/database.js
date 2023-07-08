const express = require('express');
const app = express();
const mysql = require('mysql2');

// Create the connection object
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '10081997',
  database: 'attendance_system',
});

// Export the connection object
module.exports = connection;