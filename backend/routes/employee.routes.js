const express = require('express');
const employee = require('../controllers/employess.controller');

const router = express.Router();

// Create a new hr user
router.post("/", employee.create);

// Retrieve all hr users
router.get("/", employee.findAll);

// Retrieve a single hr with id
router.get("/:first_name", employee.findOne);

// Update a hr with id
router.put("/:id", employee.update);

// Delete a hr with id
router.delete("/:id", employee.deleteEmployee);

module.exports = (app) => {
  app.use('/api/employee', router);
};
