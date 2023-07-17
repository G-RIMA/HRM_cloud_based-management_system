const db = require("../models");
const Director = db.director;
const Op = db.Sequelize.Op;


// Create Directoe
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Director
  const director = ({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    position: req.body.position,
    wage: req.body.wage
  });

  Director.create(director).then(data => {
    res.send(data);

  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured!"
    });
  });

}

// Retrieve all Director from the database (with condition).
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  let condition = first_name ? { first_name: {[Op.like]: `%${first_name}%`}}: null;


   Director.findAll({where: condition}).then (data => {
    res.send(data);
   }). catch (err => {
    res.status(500).send({
      message: err.message || "Some error Occured!"
    });
   });
   
};

// Find a single Director with a id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Director.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Director with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Director with id=" + id
      });
    }); 
};

// Update a Director identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Director.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Director was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Director with id=${id}. Maybe Director was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Director with id=" + id
      });
    });
};


// Delete a HR with the specified id in the request
exports.deleteDirector = (req, res) => {
  const id = req.params.id;

  Director.destroy({
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
