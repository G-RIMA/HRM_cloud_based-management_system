const express = require('express');
const hr = require('../controllers/hr.controllers');

const router = express.Router();

// Create a new user
router.post("/", hr.create);

// Retrieve all users
router.get("/", hr.findAll);

// Retrieve a single user with id
router.get("/:first_name", hr.findOne);

// Update a user with id
router.put("/:id", hr.update);

// Delete a user with id
router.delete("/:id", hr.deleteHr);

module.exports = (app) => {
  app.use('/api/hr', router);
};
