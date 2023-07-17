const db = require("../models");
const Org = db.org;
const Op = db.Sequelize.Op;


// Create org
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Org
  const org = ({
    org_name: req.body.org_name,
    address: req.body.address,
    email: req.body.email,
    contact: req.body.contact,
    website: req.body.website,
    
  });

  Org.create(org).then(data => {
    res.send(data);

  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured!"
    });
  });

}

// Retrieve all Org from the database (with condition).
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  let condition = first_name ? { first_name: {[Op.like]: `%${first_name}%`}}: null;


   Org.findAll({where: condition}).then (data => {
    res.send(data);
   }). catch (err => {
    res.status(500).send({
      message: err.message || "Some error Occured!"
    });
   });
   
};

// Find a single Org with a id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Org.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Organisation with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Organisation with id=" + id
      });
    }); 
};

// Update a Org identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Org.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Org was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Org with id=${id}. Maybe Org was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Org with id=" + id
      });
    });
};


// Delete a Org with the specified id in the request
exports.deleteOrg = (req, res) => {
  const id = req.params.id;

  Org.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: " Org was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Org with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Org with id=" + id
      });
    });
};
