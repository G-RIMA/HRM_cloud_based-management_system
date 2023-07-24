module.exports = (app) => {
  const attendance= require("../controllers/attendance.controller");
  //const authController = require("../controllers/auth.controller");

  const router = require("express").Router();

  router.post("/record-check-in", attendance.recordCheckIn);
  
  // Route to record lunch check-out time
  router.post("/record-lunch-check-out", attendance.recordLunchCheckOut);
  
  // Route to record lunch check-in time
  router.post("/record-lunch-check-in", attendance.recordLunchCheckIn);
  
  // Route to record check-out time
  router.post("/record-check-out", attendance.recordCheckOut);

  app.use("/api/attendance", router);
};
