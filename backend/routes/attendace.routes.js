module.exports = app => {
    const attendance = require("../controllers/attendance.controller");
  
    const router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", attendance.create);
  
    // Retrieve all Tutorials
    router.put("/markIn", attendance.markIn);
  
    // Retrieve a single Tutorial with id
    router.put("/markOut", attendance.markOut);
  
    // Delete a Tutorial with id
    router.delete("/:id", attendance.deleteAttendance);
  
    app.use('/api/attendance', router);
  };
  