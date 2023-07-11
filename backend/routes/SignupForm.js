const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const dotenv = require("dotenv")
const bcrypt = require("bcrypt")



dotenv.config();

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE


router.post('/signup', (req, res) => {
    // Create the connection
    const connection = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        //allows the execution of multiple queries
        multipleStatements: true
    });

    

})

module.exports = router;
