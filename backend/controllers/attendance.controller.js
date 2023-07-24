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
    const attendance = await Attendance.create({
      UserId,
      check_out: CheckOutTime, // Assuming you have a field "check_in" in the Attendance model
    });

    res.status(201).json({ message: "Check-Out recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-in:", err);
    res.status(500).json({ error: "Something went wrong while recording the check-in." });
  }
});
