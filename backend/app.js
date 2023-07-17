const express = require('express');
//Express is for building the Rest apis
const app = express();
const dotenv = require("dotenv")
const cors = require("cors");

//cors provides Express middleware to enable CORS with various options.
var corsOptions = {
  origin: "https://localhost:3000"
}

app.use(cors(corsOptions));

dotenv.config();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const databaseRouter = require('./routes/database');
const hrRouter = require ("./routes/hr.routes");
const employeeRouter = require("./routes/employee.routes");
const directorRouter = require("./routes/directors.routes");
const orgRouter = require("./routes/org.routes");



//simple route
app.get('/', (req, res) => {
  res.send('Server is working');
});

//routes
app.use(databaseRouter);
// if we need to drop tables

hrRouter(app);
employeeRouter(app);
directorRouter(app);
orgRouter(app);


const port = process.env.PORT // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const db = require("./models");
db.sequelize.sync();

// if we need to drop tables
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});