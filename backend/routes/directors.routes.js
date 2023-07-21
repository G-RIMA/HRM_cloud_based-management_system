module.exports = app => {
  
  const director = require('../controllers/directors.controllers');
  const authController = require("../controllers/auth.controller");

  const router = require("express").Router();
 
  // Create a new director user
  router.post("/", director.create);

  // Director login route
  router.post("/login", async (req, res) => {
    await authController.login("Director", req, res);
  });

  //login
  router.post("/signup", async (req, res) => {
    await authController.signup("Director", req, res);
  });
  
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
