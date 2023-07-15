const Org = require("../models/org.model");

// Create and Save a new org
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    // Create an org
    const org = new Org({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      contact_number: req.body.contact_number,
    });

    Org.create(org, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating a new Org."
        });
        return;
      }

      res.send(data);
    });
};

// Retrieve all Org from the database (with condition).
exports.findAll = (req, res) => {
   const name = req.query.name;
   Org.getAll(name, (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving organisation "
        }); 
    } else {
        res.send(data);
    }
   });
   
};

// Find a single org with a id
exports.findOne = (req, res) => {
    Org.findById(req.params.name, (err, data) => {
        if(err) {
            if(err.kind === "not found") {
                res.status(404).send({
                    message: `Not found that Org with name ${req.params.name}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving org with " + req.params.name

                });
            }
        } else {
            res.send(data);
        }
    });

};

// Update a org identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
    }
    
    const org = req.body;
    const id = req.params.id;
    
    Org.updateById(id, org, (err, data) => {
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
                    message: "Error updating org user with id " + id
                });
            }
        } else {
            res.send(data);
        }
    });
};


// Delete a org with the specified id in the request
exports.deleteOrg = (req, res) => {
    const id = req.params.id;
    
    Org.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Org not found with id ${id}.`,
                });
            } else {
                res.status(500).json({
                    message: `Error deleting org with id ${id}.`,
                    error: err.message,
                });
            }
        } else {
            res.json({
                message: `org deleted successfully.`,
                data: data,
            });
        }
    });
  
};
