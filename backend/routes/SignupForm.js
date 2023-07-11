// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('../database/database'); // Import your database connection object

// Define the HR or Director signup route
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate the input data (you can implement your own validation logic here)

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new HR or Director record in the database
  const createUserQuery = `INSERT INTO hr (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  const values = [firstName, lastName, email, hashedPassword];

  db.query(createUserQuery, values, (error, results) => {
    if (error) {
      console.error('Error creating HR or Director:', error);
      return res.status(500).json({ error: 'Error creating HR or Director' });
    }

    // Return a success response
    return res.status(200).json({ message: 'HR created successfully' });
  });
});

module.exports = router;
