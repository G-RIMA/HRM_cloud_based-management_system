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

Then create a test directory that will store the test files.


### FRONTEND:
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

### CREATING THE DATABASE AND THE TABLES REQUIRED
We have already set up our backend development so now we set up our database and connected it to our backend
For this we created this files and folders:
#### database folder(contains files that creates the connection object for the database and exports it)
 -  database.js 
 -  createTable.js
 - altertable.js

#### routes folder (contains routes that connects with the app.js and helps in creating the database, tables and make changes to them)
- alterTable.js
- createTable.js
- database.js

And with this code we have created the necessary tables for the attendance system and given them roles

