const db = require("../models");
const Attendance = db.attendance;
const Op = db.Sequelize.Op;
 // Assuming you have a model named "attendance" for the attendance records

// Create a new attendance record
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create an attendance record
    const attendance = {
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        lunch_check_in: req.body.lunch_check_in,
        lunch_check_out: req.body.lunch_check_out,
        employeeId: req.body.employeeId,
        hrId: req.body.hrId,
    };
    
    // Save the attendance record in the database
    Attendance.create(attendance)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the attendance record."
        });
    });
};

// Mark an employee as "checked in" with the current timestamp
exports.markIn = (req, res) => {
  const employeeId = req.params.employeeId;

  // Assuming you have a function to get the current timestamp
  const currentTime = new Date();

  // Update the checkInTime field for the employee with the current timestamp
  Attendance.update({ check_in: currentTime }, {
    where: { employeeId: employeeId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee check-in time was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update check-in time for employee with id=${employeeId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating check-in time for employee with id=" + employeeId
      });
    });
};



// Mark an employee as "checked out" with the current timestamp
exports.markOut = (req, res) => {
  const employeeId = req.params.employeeId;

  // Assuming you have a function to get the current timestamp
  const currentTime = new Date();

  // Update the checkOutTime field for the employee with the current timestamp
  Attendance.update({ check_out: currentTime }, {
    where: { employeeId: employeeId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee check-out time was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update check-out time for employee with id=${employeeId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating check-out time for employee with id=" + employeeId
      });
    });
};

// Delete an attendance record by ID
exports.deleteAttendance = (req, res) => {
  const id = req.params.id;

  Attendance.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Attendance record was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete attendance record with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete attendance record with id=" + id
      });
    });
};
