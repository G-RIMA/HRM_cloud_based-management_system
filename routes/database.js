const { exec } = require('child_process');
const express = require('express');
const router = express.Router();

router.post('/database', (req, res) => {
  // Start the database
  exec('sudo mysql', (error, stdout, stderr) => {
    if (error) {
      console.error('Error starting MySQL:', error);
      return res.status(500).json({ error: 'Error starting MySQL' });
    }
    
    // Create the database
    exec('CREATE DATABASE attendance_system', (err, stdout, stderr) => {
      if (err) {
        console.error('Error creating the database:', err);
        return res.status(500).json({ error: 'Error creating the database' });
      }
      
      // Close the MySQL connection
      exec('exit', (exitError, exitStdout, exitStderr) => {
        if (exitError) {
          console.error('Error closing MySQL connection:', exitError);
          return res.status(500).json({ error: 'Error closing MySQL connection' });
        }
        
        return res.status(200).json({ message: 'Database created successfully' });
      });
    });
  });
});

module.exports = router;
