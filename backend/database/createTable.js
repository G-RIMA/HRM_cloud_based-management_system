const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '10081997',
  database: 'attendance_system',
});

const createTableHandler = (req, res) => {
  const createTableQuery = `
    CREATE TABLE employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      department VARCHAR(50),
      designation VARCHAR(50),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (error, results) => {
    if (error) {
      console.error('Error creating table:', error);
      return res.status(500).json({ error: 'Error creating table' });
    }
    return res.status(200).json({ message: 'Table created successfully' });
  });
};

module.exports = createTableHandler;
