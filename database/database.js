const { exec } = require('child_process');
const mysql = require('mysql2');

// Create the connection object
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0907', // remember to make it an env variable
  database: 'attendance_system',
});

// Connect to the MySQL server using sudo mysql
exec('sudo mysql', (error, stdout, stderr) => {
  if (error) {
    console.error('Error starting MySQL:', error);
    throw error;
  }

  // Check if the connection was successful
  exec('exit', (exitError, exitStdout, exitStderr) => {
    if (exitError) {
      console.error('Error closing MySQL connection:', exitError);
      throw exitError;
    }

    // Connection successful, log the message
    console.log('Connected to the MySQL server');

    // Export the connection object
    module.exports = connection;
  });
});
