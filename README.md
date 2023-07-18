# HRM_cloud_based-management_system
This is a cloud based attendance management system that helps a Human Resource manager keep track of employee attendance and give or deny leave

## INSTALLING THE DEVELOPMENT ENVIRONMENT
In this project we will use:

### Backend:
For the backend we will use nodejs and Mysql. For this we need to install certain packages to handle various aspects of the application.
This packages are:
1. Express.js
A web application framework that simplifies building robust and scalable APIs and web services.

2. mysql2
A fast and feature-rich MySQL driver for Node.js that allows you to interact with the MySQL database.

3. dotenv
A package for managing environment variables, which can be useful for storing sensitive information like database credentials.

4. bcrypt
A library for hashing and securely storing passwords.

5. jsonwebtoken
A package for working with JSON Web Tokens (JWT) to handle authentication and authorization.

6. body-parser
A middleware for parsing JSON and URL-encoded request bodies.

7. cors
A middleware for enabling Cross-Origin Resource Sharing (CORS) in your application.

8. nodemon (development dependency)
A tool that automatically restarts the Node.js server whenever changes are detected, improving the development workflow.
9. sequalize
Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.

We start by initializing npm:
```
npm init
```

Then we install the packages or dependancies above:
```
npm install express mysql2 dotenv bcrypt jsonwebtoken body-parser cors --save
npm install nodemon --save-dev
```
This saves the dependancies in the package.json file.

We then install the test package:
To run tests for our Node.js application, we will use a testing framework like Mocha along with an assertion library like Chai.

To install the dependancies:
```
npm install mocha chai --save-dev
```
Install Sequalize
```
npm install sequalize
```

Then create a test directory that will store the test files.


### Frontend:
For the frontend we will use REACT.
To Install the dependancies we use:
```
npm create vite@latest

```
This created a VIte and React application
We then go into the frontend folder and install the dependancies:
```
cd frontend
npm install
npm run dev
```
This confirms our frontend works just fine.


## IMPLEMENTING THE BACKEND LOGIC

### CREATING THE SERVER
our server will be in app.js
In this file:
 * import express, and cors modules:
   1. Express is for building the Rest apis
   2. pcors provides Express middleware to enable CORS with various options.
* create an Express app, then add body-parser (json and urlencoded) and cors middlewares using app.use() method. 
* define a GET route which is simple for test.
* listen on port 3000 for incoming requests.

To run the server we use:
```
node app.js
```
or 
In package.json, we change:
```
"scripts": {
    "devStart":"nodemon app.js",
}
```
This will allow us to run the server, and it will automatically detect the changes in the code, no need to restart it every time.
```
npm run devStart 
```

### CREATING THE DATABASE AND THE TABLES REQUIRED
We have already set up our backend development so now we set up our database and connected it to our backend
For this we created this files and folders:
#### database folder(contains files that creates the connection object for the database and exports it)
 -  db.config.js
    we create a separate config folder for configuration
    pool is optional, it will be used for Sequelize connection pool configuration:
    + max: maximum number of connection in pool
    + min: minimum number of connection in pool
    + idle: maximum time, in milliseconds, that a connection can be idle before being released
    + acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error


#### Initialize Sequelize in backend/models
- index.js 


#### Define the Sequelize models
- attendance.model.js
- department.model.js
- directors.model.js
- employee.model.js
- hr.model.js
- job_title.model.js
- leave.model.js
- org.model.js
This creates all the tables we need for the system

#### Create the controllers
- attendance.controller.js
- directors.controllers.js
- employees.controllers.js
- hr.controllers.js
- leave.controller.js
- org.controller.js
This files controll all the crud functions we need, create, findone,find many and delete.


#### routes folder (contains routes that connects with the app.js and helps in creating the database, tables and make changes to them)
- attendance.routes.js
- database.js
- directors.js
- employee.routes.js
- hr.routes.js
- leave.routes.js
- org.routes.js

#### Then connect the routes with the server
```
const databaseRouter = require('./routes/database');
const hrRouter = require ("./routes/hr.routes");
const employeeRouter = require("./routes/employee.routes");
const directorRouter = require("./routes/directors.routes");
const orgRouter = require("./routes/org.routes");
const attendanceRouter = require("./routes/attendace.routes")


app.use(databaseRouter);

hrRouter(app);
employeeRouter(app);
directorRouter(app);
orgRouter(app);
attendanceRouter(app);
```

Then sync
```
const db = require("./models");
db.sequelize.sync();

// if we need to drop tables

db.sequelize.sync()
  .then(() => {
    console.log("Synchronized db.");
  })
  .catch(error => {
    console.error("Error while synchronizing db:", error);
  });


```

And with that we have created our tables, now to connect them with foreign keys:
In our index.js we add this code:
```
//employee belongs to one organisation 
db.employee.belongsTo(db.org, {
  foreignKey: {
    name: 'orgId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// many employees can be in one org
db.org.hasMany(db.employee, {
  foreignKey: {
    name: 'orgId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// other relationships in the code
```

Now our database is complete.



