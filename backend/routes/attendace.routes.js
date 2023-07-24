module.exports = (app) => {
  const attendance= require("../controllers/attendance.controller");
  //const authController = require("../controllers/auth.controller");

  const router = require("express").Router();

  router.post("/", attendance.createAttendance);
  router.put("/:id",  attendance.updateAttendance);
  router.delete("/:id", attendance.deleteAttendance);
  router.get("/find", attendance.findAttendance);

  app.use("/api/attendance", router);
};
