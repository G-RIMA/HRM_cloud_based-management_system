const Hr = require("../models/users.model.js");

// Create and Save a new Hr
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Hr
    const hr = new Hr({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        hr_type: req.body.hr_type
    });

    Hr.create(hr, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating a new Hr."
          });
        else res.send(data);
    });

  
};

// Retrieve all Hr from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single Hr with a id
exports.findOne = (req, res) => {
  
};

// Update a HR identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a HR with the specified id in the request
exports.deleteHr = (req, res) => {
  
};

// Delete all HR from the database.
exports.deleteAll = (req, res) => {
  
};
