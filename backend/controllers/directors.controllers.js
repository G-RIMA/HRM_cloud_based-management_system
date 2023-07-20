const db = require("../models");
const Director = db.director;
const Org = db.org;
const departmentModel = db.department;
const JobTitle = db.job_title;

const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");


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

exports.signup = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const { first_name, last_name, email, password, hr_type, position, wage, org_name, job_title, dep_name } = req.body;

    // Check if HR with the given email already exists
    const existingDirector = await Director.findOne({ where: { email } });

    if (existingDirector) {
      return res.status(409).send({ message: "Director with this email already exists." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find or create the organization based on its name
    const organization = await Org.findOrCreate({
      where: { org_name, },
      defaults: { org_name, address: "", email: "", website: "" },
    });

    // Find or create the department based on its name
    const department = await departmentModel.findOrCreate({
      where: { dep_name },
      defaults: { dep_name },
    });

    // Find or create the department based on its name
    const job = await JobTitle.findOrCreate({
      where: { job_title },
      defaults: { job_title },
    });



    // Create a new HR instance with the hashed password
    const director = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      hr_type,
      position,
      wage,
      orgId: organization[0].id,
      departmentId: department[0].id,
      jobId: job[0].id
    };

    // Save the HR instance to the database
    const createdDirector = await Director.create(director);

    return res.status(201).send({ message: "Director created successfully!", data: createdDirector });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Some error occurred!" });
  }
};
