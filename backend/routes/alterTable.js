const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.post('/alterTable', (req, res) => {
  // Create the connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10081997',
    database: 'attendance_system',
    //allows the execution of multiple queries
    multipleStatements: true
  });

  const alterTableQuery = `
  ALTER TABLE director
  ADD COLUMN password VARCHAR(100) NOT NULL;
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