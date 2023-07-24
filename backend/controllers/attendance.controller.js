const db = require("../models");
const Attendance = db.attendance;
const Op = db.Sequelize.Op;
const asyncHandler = require("express-async-handler");
const { userType } = require("./auth.controller");
const UserSession = db.userSession;


// Create a new attendance record
exports.createAttendance = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the user information from the UserSession model
    const userSession = await UserSession.findOne({ where: { token } });
    if (!userSession) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Extract the userType and attendanceOwnerId from the userSession
    const { userType } = userSession;
    const attendanceOwnerId = userSession.userId;

    // Check if the user has access to attendance records
    if (!hasAccessToAttendance(userType, attendanceOwnerId)) {
      return res.status(403).json({ error: "Unauthorized to access attendance records." });
    }

    // ... The rest of the code to create the attendance record ...
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong while creating the attendance record." });
  }

  const hasAccessToAttendance = (userType, attendanceOwnerId) => {
    // Check if the user is HR or director, they have access to all attendance records
    if (userType === "Hr" || userType === "Director") {
      return true;
    }
  
    // For employees, they have access only to their own attendance records
    return userType === "Employee" && userType.id === attendanceOwnerId;
  };
  
  const {
    date,
    check_in,
    check_out,
    lunch_check_in,
    lunch_check_out,
    details,
  } = req.body;

  const newAttendance = await Attendance.create({
    date,
    check_in,
    check_out,
    lunch_check_in,
    lunch_check_out,
    details,
  });

  res.status(201).json(newAttendance);
});

// Update an existing attendance record
exports.updateAttendance = asyncHandler(async (req, res) => {
   // Assuming you have extracted the user information from the JWT token and stored it in req.user
   try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the user information from the UserSession model
    const userSession = await UserSession.findOne({ where: { token } });
    if (!userSession) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Extract the userType and attendanceOwnerId from the userSession
    const { userType } = userSession;
    const attendanceOwnerId = userSession.userId;

    // Check if the user has access to attendance records
    if (!hasAccessToAttendance(userType, attendanceOwnerId)) {
      return res.status(403).json({ error: "Unauthorized to access attendance records." });
    }

    // ... The rest of the code to update the attendance record ...
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong while updating the attendance record." });
  }

  const { id } = req.params;
  const {
    date,
    check_in,
    check_out,
    lunch_check_in,
    lunch_check_out,
    details,
  } = req.body;

  const attendance = await Attendance.findByPk(id);
  if (!attendance) {
    res.status(404);
    throw new Error("Attendance record not found");
  }

  attendance.date = date;
  attendance.check_in = check_in;
  attendance.check_out = check_out;
  attendance.lunch_check_in = lunch_check_in;
  attendance.lunch_check_out = lunch_check_out;
  attendance.details = details;

  await attendance.save();

  res.json(attendance);
});

// Delete an attendance record
exports.deleteAttendance = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the user information from the UserSession model
    const userSession = await UserSession.findOne({ where: { token } });
    if (!userSession) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Extract the userType and attendanceOwnerId from the userSession
    const { userType } = userSession;
    const attendanceOwnerId = userSession.userId;

    // Check if the user has access to attendance records
    if (!hasAccessToAttendance(userType, attendanceOwnerId)) {
      return res.status(403).json({ error: "Unauthorized to access attendance records." });
    }

    // ... The rest of the code to delete the attendance record ...
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong while deleting the attendance record." });
  } 

  const { id } = req.params;
  const attendance = await Attendance.findByPk(id);
  if (!attendance) {
    res.status(404);
    throw new Error("Attendance record not found");
  }

  await attendance.destroy();

  res.json({ message: "Attendance record deleted successfully" });
});

// Find attendance records by date, time, or department
exports.findAttendance = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the user information from the UserSession model
    const userSession = await UserSession.findOne({ where: { token } });
    if (!userSession) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Extract the userType and attendanceOwnerId from the userSession
    const { userType } = userSession;
    const attendanceOwnerId = userSession.userId;

    // Check if the user has access to attendance records
    if (!hasAccessToAttendance(userType, attendanceOwnerId)) {
      return res.status(403).json({ error: "Unauthorized to access attendance records." });
    }

    // Rest of the code to find the attendance records
    const { date, time, department } = req.query;
    const whereClause = {};

    if (date) {
      whereClause.date = date;
    }

    if (time) {
      whereClause[Op.or] = {
        check_in: { [Op.lte]: time },
        check_out: { [Op.gte]: time },
        lunch_check_in: { [Op.lte]: time },
        lunch_check_out: { [Op.gte]: time },
      };
    }

    if (department) {
      whereClause.department = department;
    }

    const attendance = await Attendance.findAll({
      where: whereClause,
    });

    if (attendance.length === 0) {
      res.status(404);
      throw new Error("No attendance records found");
    }

    res.json(attendance);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong while fetching attendance records." });
  }
});
