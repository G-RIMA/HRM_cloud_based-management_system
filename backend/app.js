const express = require('express');
const app = express();

const databaseRouter = require('./routes/database');
const tableRouter = require('./routes/createTable');

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

//routes
app.use(databaseRouter);
app.use(tableRouter);


const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
