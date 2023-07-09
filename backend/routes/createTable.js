const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

router.post('/createTable', (req, res) => {
  // Create the connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10081997',
    database: 'attendance_system',
    multipleStatements: true
  });

  // Create the HR table
  const createAdminTableQuery = `
    CREATE TABLE IF NOT EXISTS hr (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'admin'
    );

    CREATE TABLE IF NOT EXISTS director (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'admin'
    );
  `;
  
  // Execute the query to create the HR table
  connection.query(createAdminTableQuery, (error, results) => {
    if (error) {
      console.error('Error creating HR tables:', error);
    } else {
      console.log('HR tables created successfully');
    }
  });


  const createOtherTableQuery = `
    CREATE TABLE IF NOT EXISTS departments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS job_titles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user',
      department_id INT,
      job_title_id INT,
      FOREIGN KEY (department_id) REFERENCES departments(id),
      FOREIGN KEY (job_title_id) REFERENCES job_titles(id)
    );

    CREATE TABLE IF NOT EXISTS organizations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      address VARCHAR(255),
      contact_number VARCHAR(20),
      email VARCHAR(100),
      hr_id INT,
      director_id INT,
      FOREIGN KEY (hr_id) REFERENCES hr(id),
      FOREIGN KEY (director_id) REFERENCES director(id)
    );

    CREATE TABLE IF NOT EXISTS attendance_records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT,
      check_in DATETIME NOT NULL,
      check_out DATETIME,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    );

    CREATE TABLE IF NOT EXISTS leave_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      status ENUM('pending', 'approved', 'rejected') NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    );

    CREATE TABLE IF NOT EXISTS shifts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      start_time TIME,
      end_time TIME
    );

    CREATE TABLE IF NOT EXISTS logins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id INT,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    );

    CREATE TABLE IF NOT EXISTS holidays (
      id INT AUTO_INCREMENT PRIMARY KEY,
      date DATE NOT NULL,
      name VARCHAR(100) NOT NULL
    );
  `;
  

  // Execute the query to create other tables
  connection.query(createOtherTableQuery, (error, results) => {
    if (error) {
      console.error('Error creating other tables:', error);
    } else {
      console.log('Other tables created successfully');
    }

    connection.end(); // Close the MySQL connection
  });
});

module.exports = router;
