module.exports = app => {
  const hr = require("../controllers/hr.controllers.js");
  const authController = require("../controllers/auth.controller.js");

  const router = require("express").Router();
  const passport = require('passport')
  
  // Create a new Tutorial
  router.post("/", hr.create);

  // HR login route
  router.post("/login", async (req, res) => {
    await authController.login("Hr", req, res);
  });
    
  router.post('/login', passport.authenticate('hr'), (req, res) => {
    res.json({ message: 'Login successful!', user: req.user });
  });
    
  


  // Retrieve all Tutorials
  router.get("/", hr.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", hr.findOne);

  // Update a Tutorial with id
  router.put("/:id", hr.update);

  // Delete a Tutorial with id
  router.delete("/:id", hr.deleteHr);

  app.use('/api/hr', router);
};
