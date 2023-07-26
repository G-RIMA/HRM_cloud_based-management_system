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
    const date = new date();
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
        UserId,
        check_in: checkInTime,
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

    // Save the check-in time in the database (you can modify the attendance model accordingly

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime"
    const attendance = await Attendance.findOne({
      where: {
        UserId,
      },
    });

    if (!attendance) {
      return res.status(404).json({ error: "No active attendance record found for the user." });
    }

    // Update the lunch check-in time in the existing "Attendance" record
    attendance.lunch_check_out = new Date();
    await attendance.save();

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
    //const LunchCheckInTime = new Date();

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime"
    const attendance = await Attendance.findOne({
      where: {
        UserId,
      },
    });

    if (!attendance) {
      return res.status(404).json({ error: "No active attendance record found for the user." });
    }

    // Update the lunch check-in time in the existing "Attendance" record
    attendance.lunch_check_in = new Date();
    await attendance.save();

    res.status(201).json({ message: "Lunch Check-In recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-in:", err);
    res.status(500).json({error: "Something went wrong while recording the check-in."  });
  }
});

exports.recordCheckOut = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const UserId = await getUserIdFromToken(token);
    if (!UserId) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }

    // Save the check-out time in the database (you can modify the attendance model accordingly)
    const checkOutTime = new Date();

    // Example: Assuming you have an "Attendance" model with fields "userId" and "checkInTime" and "checkOutTime"
    const attendance = await Attendance.findOne({
      where: {
        UserId,
      },
    });

    if (!attendance) {
      return res.status(404).json({ error: 'No active check-out found for the user.' });
    }

    attendance.check_out = checkOutTime;
    await attendance.save();

    res.status(201).json({ message: "Check-Out recorded successfully.", attendance });
  } catch (err) {
    console.error("Error recording check-out:", err);
    res.status(500).json({ error: "Something went wrong while recording the check-out." });
  }
});

// Find a single Hr with a id
exports.findAllForUserId = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    // Fetch the userId from the UserSession based on the token
    const UserId = await getUserIdFromToken(token);
    if (!UserId) {
      return res.status(401).json({ error: "Unauthorized. Invalid or expired token." });
    }
    
    const data = await Attendance.findAll({ where: { UserId } });
    if (data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `No records found for UserId=${UserId}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving records: " + error.message
    });
  }
});

exports.getAllRecords = async (req, res) => {
  const UserId = req.query.UserId;
  let condition = UserId ? { UserId: {[Op.like]: `%${UserId}%`}}: null;


   Attendance.findAll({where: condition}).then (data => {
    res.send(data);
   }). catch (err => {
    res.status(500).send({
      message: err.message || "Some error Occured!"
    });
   });
};
