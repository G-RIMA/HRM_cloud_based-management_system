const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Create a new Sequelize instance with the environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Test the database connection
async function testConnection(req, res, next) {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    res.status(200).send('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).send('Unable to connect to the database.');
  }
}

router.get('/test-connection', testConnection);

module.exports = router;

