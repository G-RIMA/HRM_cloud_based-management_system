const express = require('express');
const director = require('../controllers/directors.controllers');

const router = express.Router();

// Create a new director user
router.post("/", director.create);

// Retrieve all director users
router.get("/", director.findAll);

// Retrieve a single director with id
router.get("/:first_name", director.findOne);

// Update a director with id
router.put("/:id", director.update);

// Delete a director with id
router.delete("/:id", director.deleteDirector);

module.exports = (app) => {
  app.use('/api/director', router);
};
