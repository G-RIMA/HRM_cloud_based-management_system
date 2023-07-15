const express = require('express');
const employee = require('../controllers/employess.controller');

const router = express.Router();

// Create a new  user
router.post("/", employee.create);

// Retrieve all  users
router.get("/", employee.findAll);

// Retrieve a single user with id
router.get("/:first_name", employee.findOne);

// Update a user with id
router.put("/:id", employee.update);

// Delete a user with id
router.delete("/:id", employee.deleteEmployee);

module.exports = (app) => {
  app.use('/api/employee', router);
};
