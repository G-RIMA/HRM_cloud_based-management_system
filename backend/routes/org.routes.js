module.exports = app => {
  const org = require('../controllers/org.controller');
  
  const router = require("express").Router();
  
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
  
  app.use('/api/org', router);
};