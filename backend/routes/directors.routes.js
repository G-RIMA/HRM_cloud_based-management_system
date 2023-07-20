module.exports = app => {
  
  const director = require('../controllers/directors.controllers');

  const router = require("express").Router();
 
  // Create a new director user
  router.post("/", director.create);

  //signup director
  router.post('/signup', director.signup);

  //login
  //signup hr
  router.post('/login', director.login);

  
  // Retrieve all director users
  router.get("/", director.findAll);
  
  // Retrieve a single director with id
  router.get("/:first_name", director.findOne);
  
  // Update a director with id
  router.put("/:id", director.update);
  
  // Delete a director with id
  router.delete("/:id", director.deleteDirector);

  app.use('/api/director', router);

};
