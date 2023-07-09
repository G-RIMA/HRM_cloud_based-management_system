const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.post('/createTable', (req, res) => {
  // Create the connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10081997',
    database: 'attendance_system'
  });

  //Create the table
  const createEmployerTableQuery = `
  DROP TABLE employer, employees
`;

  // Execute the query to create the employees table
  connection.query(createEmployerTableQuery, (error, results) => {
    if (error) {
        console.error('Error deleting employer table:', error);
    } else {
        console.log('Employer table deleted successfully');
    }
    connection.end(); // Close the MySQL connection
});

});
module.exports = router;