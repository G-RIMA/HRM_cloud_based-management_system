const db = require("../models");
const Hr = db.hr;

const Op = db.Sequelize.Op;


// Create HR
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Hr
  const hr = ({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    hr_type: req.body.hr_type,
    wage: req.body.wage
  });

  Hr.create(hr).then(data => {
    res.send(data);

  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured!"
    });
  });

}

// Retrieve all Hr from the database (with condition).
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  let condition = first_name ? { first_name: {[Op.like]: `%${first_name}%`}}: null;


   Hr.findAll({where: condition}).then (data => {
    res.send(data);
   }). catch (err => {
    res.status(500).send({
      message: err.message || "Some error Occured!"
    });
   });
   
};

// Find a single Hr with a id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hr.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Hr with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Hr with id=" + id
      });
    }); 
};

// Update a HR identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Hr.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Hr was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update HR with id=${id}. Maybe Hr was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Hr with id=" + id
      });
    });
};


// Delete a HR with the specified id in the request
exports.deleteHr = (req, res) => {
  const id = req.params.id;

  Hr.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Hr was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Hr with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Hr with id=" + id
      });
    });
};

