const express = require('express');
const app = express();

const databaseRouter = require('./routes/database');
const tableRouter = require('./routes/createTable');
const alterRouter = require('./routes/alterTable');

app.get('/', (req, res) => {
  res.send('Server is working');
});

//routes
app.use(databaseRouter);
app.use(tableRouter);
app.use(alterRouter);


const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
