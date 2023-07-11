const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const dotenv = require("dotenv")

dotenv.config();

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE


router.post('/alterTable', (req, res) => {
  // Create the connection
  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    //allows the execution of multiple queries
    multipleStatements: true
  });

  const alterTableQuery = `
  DROP TABLE test ;
  `;


  // Execute the query to create other tables
  connection.query(alterTableQuery, (error, results) => {
    if (error) {
      console.error('Error altering tables:', error);
    } else {
      console.log('Altering tables successfully');
    }

    connection.end(); // Close the MySQL connection
  });
});

module.exports = router;