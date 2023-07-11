const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

// Create the connection
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // allows the execution of multiple queries
    multipleStatements: true
  });

// Add middleware to parse JSON request body
router.use(express.json());

router.post('/signup', async (req, res) => {
        try {
          const { first_name, last_name, email, password,role , hr_type} = req.body;
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user record in the database based on the role
          const connection = await pool.promise().getConnection();
      
          if (role === 'HR') {
            const query = 'INSERT INTO hr (first_name, last_name, email, password, hr_type) VALUES (?, ?, ?, ?, ?)';
            const values = [first_name, last_name, email, hashedPassword, hr_type];
            await connection.query(query, values);
          } else if (role === 'Director') {
            const query = 'INSERT INTO director (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
            const values = [first_name, last_name, email, hashedPassword];
            await connection.query(query, values);
          } else {
            console.log('Error!')
          }
      
          connection.release();
      
          res.status(201).json({ message: 'Signup successful' });
        } catch (error) {
          console.error('Signup error:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      
  
});

module.exports = router;
