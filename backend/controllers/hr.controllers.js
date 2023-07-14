const Hr = require("../models/hr.model.js");
const bcrypt = require("bcrypt");

// Create and Save a new Hr
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

    // Create a Hr
    const hr = new Hr({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      hr_type: req.body.hr_type
    });

    Hr.create(hr, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating a new Hr."
        });
        return;
      }

      res.send(data);
    });
  });
};

// Retrieve all Hr from the database (with condition).
exports.findAll = (req, res) => {
   const first_name = req.query.first_name;
   const hr_type = req.query.hr_ty;

   Hr.getAll(first_name, (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving Hr "
        }); 
    } else {
        res.send(data);
    }
   });
   
};

// Find a single Hr with a id
exports.findOne = (req, res) => {
    Hr.findById(req.params.first_name, (err, data) => {
        if(err) {
            if(err.kind === "not found") {
                res.status(404).send({
                    message: `Not found that Hr with name ${req.params.first_name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Hr with " + req.params.first_name

                });
            }
        } else {
            res.send(data);
        }
    });

    Hr.findById(req.params.hr_type, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
              res.status(404).send({
                message: `Not found that Hr with hr_type ${req.params.hr_type}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Hr with " + req.params.hr_type
              });
            }
          } else {
            if (data && (data.hr_type === "manager" || data.hr_type === "consultant")) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Not found that Hr with hr_type ${req.params.hr_type}.`
              });
            }
          }
    });
};

// Update a HR identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
    }
    
    const hr = req.body;
    const id = req.params.id;
    
    Hr.updateById(id, hr, (err, data) => {
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
                    message: "Error updating HR user with id " + id
                });
            }
        } else {
            res.send(data);
        }
    });
};


// Delete a HR with the specified id in the request
exports.deleteHr = (req, res) => {
    const id = req.params.id;
    
    Hr.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Hr not found with id ${id}.`,
                });
            } else {
                res.status(500).json({
                    message: `Error deleting hr with id ${id}.`,
                    error: err.message,
                });
            }
        } else {
            res.json({
                message: `hr deleted successfully.`,
                data: data,
            });
        }
    });
  
};

