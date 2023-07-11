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
const connection = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // allows the execution of multiple queries
    multipleStatements: true
  });

router.post('/signup', async (req, res) => {
    router.post('/signup', async (req, res) => {
        try {
          const { firstName, lastName, email, password, organization, role } = req.body;
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user record in the database based on the role
          const connection = await pool.getConnection();
      
          if (role === 'HR') {
            const query = 'INSERT INTO hr (firstName, lastName, email, password, organization) VALUES (?, ?, ?, ?, ?)';
            const values = [firstName, lastName, email, hashedPassword, organization];
            await connection.query(query, values);
          } else if (role === 'Director') {
            const query = 'INSERT INTO director (firstName, lastName, email, password, organization) VALUES (?, ?, ?, ?, ?)';
            const values = [firstName, lastName, email, hashedPassword, organization];
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
  
});

module.exports = router;
