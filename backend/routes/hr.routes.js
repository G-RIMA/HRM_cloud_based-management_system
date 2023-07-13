const express = require('express');
const hr = require('../controllers/hr.controllers');

const router = express.Router();

// Create a new hr user
router.post("/", hr.create);

// Retrieve all hr users
router.get("/", hr.findAll);

// Retrieve a single hr with id
router.get("/:id", hr.findOne);

// Update a hr with id
router.put("/:id", hr.update);

// Delete a hr with id
router.delete("/:id", hr.deleteHr);

// Delete hr users
router.delete("/", hr.deleteAll);

module.exports = (app) => {
  app.use('/api/hr', router);
};
