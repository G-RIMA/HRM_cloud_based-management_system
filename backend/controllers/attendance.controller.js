const db = require("../models");
const Attendance = db.attendance;
const Op = db.Sequelize.Op;
const asyncHandler = require("express-async-handler");
const UserSession = db.userSession;

// Helper function to get user ID from token
const getUserIdFromToken = async (token) => {
  const userSession = await UserSession.findOne({ where: { token } });
  if (!userSession) {
    return null; // Invalid or expired token
  }
  return userSession.UserId;
};

// Record the check-in time
exports.recordCheckIn = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"

    // Fetch the userId from the UserSession based on the token
    const UserId = await getUserIdFromToken(token);
    if (!UserId) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Save the check-in time in the database (you can modify the attendance model accordingly)
    const checkInTime = new Date();

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime"
    const attendance = await Attendance.create({
      UserId, // Use the correct userId obtained from the token
      check_in: checkInTime, // Assuming you have a field "check_in" in the Attendance model
    });

    res.status(201).json({ message: "Check-in recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-in:", err); // Log the error for debugging
    res.status(500).json({ error: "Something went wrong while recording the check-in." });
  }
});


// Similar functions for recording lunch check-out, lunch check-in, and check-out
exports.recordLunchCheckOut = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the userId from the UserSession based on the token
    const UserId = await getUserIdFromToken(token);
    if (!UserId) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Save the check-in time in the database (you can modify the attendance model accordingly)
    const LunchCheckOutTime = new Date();

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime"
    const attendance = await Attendance.create({
      UserId,
      lunch_check_out: LunchCheckOutTime, // Assuming you have a field "check_in" in the Attendance model
    });

    res.status(201).json({ message: "Lunch Check-Out recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-in:", err);
    res.status(500).json({ error: "Something went wrong while recording the check-in." });
  }
});

exports.recordLunchCheckIn = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the userId from the UserSession based on the token
    const UserId = await getUserIdFromToken(token);
    if (!UserId) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Save the check-in time in the database (you can modify the attendance model accordingly)
    const LunchCheckInTime = new Date();

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime"
    const attendance = await Attendance.create({
      UserId,
      lunch_check_in: LunchCheckInTime, // Assuming you have a field "check_in" in the Attendance model
    });

    res.status(201).json({ message: "Lunch Check-In recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-in:", err);
    res.status(500).json({error: "Something went wrong while recording the check-in."  });
  }
});

exports.recordCheckOut = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Assuming the token is in the format: "Bearer <token>"
    
    // Fetch the userId from the UserSession based on the token
    const UserId = await getUserIdFromToken(token);
    if (!UserId) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Save the check-in time in the database (you can modify the attendance model accordingly)
    const CheckOutTime = new Date();

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime"
    const attendance = await Attendance.findOne({ where:{
      UserId,
      check_out: null,} // Assuming you have a field "check_in" in the Attendance model
    });

    if (!attendance) {
      return res.status(404).json({ error: 'No active check-in found for the user.' });
    }

    attendance.check_out = CheckOutTime;
    await attendance.save();

    // Calculate total working hours, overtime, late arrivals, and early departures
    const totalWorkingHours = calculateTotalWorkingHours(attendance.check_in, CheckOutTime);
    const overtime = calculateOvertime(totalWorkingHours);
    const lateArrivals = calculateLateArrivals(attendance.check_in);
    const earlyDepartures = calculateEarlyDepartures(CheckOutTime);

    // Update the Attendance model with the calculated values
    attendance.total_working_hours = totalWorkingHours;
    attendance.overtime = overtime;
    attendance.late_arrivals = lateArrivals;
    attendance.early_departures = earlyDepartures;

    await attendance.save();

    res.status(201).json({ message: "Check-Out recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-in:", err);
    res.status(500).json({ error: "Something went wrong while recording the check-in." });
  }
});


const calculateTotalWorkingHours = (checkInTime, checkOutTime) => {
  const diffInMilliseconds = checkOutTime - checkInTime;
  const totalWorkingHours = new Date(diffInMilliseconds);
  return totalWorkingHours;
};

const calculateOvertime = (totalWorkingHours) => {
  // Example: Calculate overtime if totalWorkingHours is greater than regular working hours
  const regularWorkingHours = '08:00:00';
  if (totalWorkingHours > regularWorkingHours) {
    const diffInMilliseconds = new Date(totalWorkingHours) - new Date(regularWorkingHours);
    const overtime = new Date(diffInMilliseconds);
    return overtime;
  }
  return '00:00:00';
};

const calculateLateArrivals = (checkInTime) => {
  const regularCheckInTime = new Date(checkInTime);
  regularCheckInTime.setHours(8, 0, 0); // Assuming regular check-in time is 8:00 AM
  if (checkInTime > regularCheckInTime) {
    const diffInMilliseconds = checkInTime - regularCheckInTime;
    const lateArrival = new Date(diffInMilliseconds)
    return lateArrival;
  }
  return '00:00:00';
};

const calculateEarlyDepartures = (checkOutTime) => {
  const regularCheckOutTime = new Date(checkOutTime);
  regularCheckOutTime.setHours(17, 0, 0); // Assuming regular check-out time is 5:00 PM
  if (checkOutTime < regularCheckOutTime) {
    const diffInMilliseconds = regularCheckOutTime - checkOutTime;
    const earlyDeparture = new Date(diffInMilliseconds)
    return earlyDeparture;
  }
  return '00:00:00';
};

exports.getAttendanceRecords = async (req, res) => {
  const UserId = req.params.UserId;

  try {
    // Query the database to get attendance records for the user
    const attendanceRecords = await Attendance.findAll({ where: { UserId } });

    res.status(200).json({ attendanceRecords });
  } catch (err) {
    console.error('Error fetching attendance records:', err);
    res.status(500).json({ error: 'Something went wrong while fetching attendance records.' });
  }
};
