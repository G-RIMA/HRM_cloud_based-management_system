const express = require('express');
const hr = require('../controllers/hr.controllers');

const router = express.Router();

// Create a new hr user
router.post("/", hr.create);

// Retrieve all hr users
router.get("/", hr.findAll);

// Retrieve a single hr with id
router.get("/:first_name", hr.findOne);

// Update a hr with id
router.put("/:id", hr.update);

// Delete a hr with id
router.delete("/:id", hr.deleteHr);

module.exports = (app) => {
  app.use('/api/hr', router);
};
