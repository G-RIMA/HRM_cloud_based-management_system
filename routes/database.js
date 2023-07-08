const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.post('/database', (req, res) => {
  // Create the database connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10081997',
  });

  // Create the database
  //connection.query('CREATE DATABASE attendance_system', (err) => {
    //if (err) {
      //console.error('Error creating the database:', err);
      //return res.status(500).json({ error: 'Error creating the database' });
    //}

    //check if database is created
    connection.query('SHOW DATABASES LIKE "attendance_system"', (error, results) => {
      if (error) {
        console.error('Error checking database:', error);
        return;
      }
    
      if (results.length > 0) {
        console.log('Database exists');
      } else {
        console.log('Database does not exist');
      }
    
      connection.end();
    });
});

module.exports = router;
