const Employee = require("../models/employee.model");
const bcrypt = require("bcrypt");

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Generate a salt and hash the password
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({
        message: "Error occurred while hashing the password"
      });
      return;
    }

    // Create a Employee
    const employee = new Employee({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });

    Employee.create(employee, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating a new Employee."
        });
        return;
      }

      res.send(data);
    });
  });
};

// Retrieve all employees from the database (with condition).
exports.findAll = (req, res) => {
   const first_name = req.query.first_name;

   Employee.getAll(first_name, (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving Employee "
        }); 
    } else {
        res.send(data);
    }
   });
   
};

// Find a single Employee with a id
exports.findOne = (req, res) => {
    Employee.findById(req.params.first_name, (err, data) => {
        if(err) {
            if(err.kind === "not found") {
                res.status(404).send({
                    message: `Not found that Employee with name ${req.params.first_name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Employee with " + req.params.first_name

                });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a employee identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
    }
    
    const employee = req.body;
    const id = req.params.id;
    
    Employee.updateById(id, employee, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${id}.`
                });
            } else if (err.kind === "bad_request") {
                res.status(400).send({
                    message: "No valid fields provided for update."
                });
            } else {
                res.status(500).send({
                    message: "Error updating Employee user with id " + id
                });
            }
        } else {
            res.send(data);
        }
    });
};


// Delete a Employee with the specified id in the request
exports.deleteEmployee = (req, res) => {
    const id = req.params.id;
    
    Employee.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Employee not found with id ${id}.`,
                });
            } else {
                res.status(500).json({
                    message: `Deleting employee with id ${id}.`,
                    error: err.message,
                });
            }
        } else {
            res.json({
                message: `employee deleted successfully.`,
                data: data,
            });
        }
    });
  
};