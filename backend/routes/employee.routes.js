module.exports = app => {
  const employee = require('../controllers/employees.controller');
  
  const router = require("express").Router()
  
  // Create a new  user
  router.post("/", employee.create);
  
  // Retrieve all  users
  router.get("/", employee.findAll);

  // Retrieve a single user with id
  router.get("/:id", employee.findOne);
  
  // Update a user with id
  router.put("/:id", employee.update);
  
  // Delete a Tutorial with id
  router.delete("/:id", employee.deleteEmployee);


  app.use('/api/employee', router);
};
