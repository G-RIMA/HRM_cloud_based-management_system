module.exports = app => {
  const hr = require("../controllers/hr.controllers.js");

  const router = require("express").Router();

  // Create a new Tutorial
  router.post("/", hr.create);

  //signup hr
  router.post('/signup', hr.signup);

  //signup hr
  router.post('/login', hr.login);


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
