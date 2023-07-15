const Director = require("../models/directors.model");
const bcrypt = require("bcrypt");

// Create and Save a new Director
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

    // Create a Director
    const director = new Director({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });

    Director.create(director, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating a new Director."
        });
        return;
      }

      res.send(data);
    });
  });
};

// Retrieve all director from the database (with condition).
exports.findAll = (req, res) => {
   const first_name = req.query.first_name;

   Director.getAll(first_name, (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving Director "
        }); 
    } else {
        res.send(data);
    }
   });
   
};

// Find a single director with a id
exports.findOne = (req, res) => {
    Director.findById(req.params.first_name, (err, data) => {
        if(err) {
            if(err.kind === "not found") {
                res.status(404).send({
                    message: `Not found that Director with name ${req.params.first_name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Director with " + req.params.first_name

                });
            }
        } else {
            res.send(data);
        }
    });
};

// Update a director identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
    }
    
    const director = req.body;
    const id = req.params.id;
    
    Director.updateById(id, director, (err, data) => {
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
                    message: "Error updating user with id " + id
                });
            }
        } else {
            res.send(data);
        }
    });
};


// Delete a director with the specified id in the request
exports.deleteDirector = (req, res) => {
    const id = req.params.id;
    
    Director.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Director not found with id ${id}.`,
                });
            } else {
                res.status(500).json({
                    message: `Error deleting Director with id ${id}.`,
                    error: err.message,
                });
            }
        } else {
            res.json({
                message: `Director deleted successfully.`,
                data: data,
            });
        }
    });
  
};
