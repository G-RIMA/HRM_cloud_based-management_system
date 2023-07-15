const express = require('express');
const org = require('../controllers/org.controller');

const router = express.Router();

// Create a new user
router.post("/", org.create);

// Retrieve all users
router.get("/", org.findAll);

// Retrieve a single user with id
router.get("/:name", org.findOne);

// Update a user with id
router.put("/:id", org.update);

// Delete a user with id
router.delete("/:id", org.deleteOrg);

module.exports = (app) => {
  app.use('/api/org', router);
};