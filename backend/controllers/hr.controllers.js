const db = require("../models");
const Hr = db.hr;
const Org = db.org;
const departmentModel = db.department;
const JobTitle = db.job_title;

const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");



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
    position: req.body.position,
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

exports.signup = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const { first_name, last_name, email, password, hr_type, position, wage, org_name, job_title, dep_name, } = req.body;

    // Check if HR with the given email already exists
    const existingHr = await Hr.findOne({ where: { email } });

    if (existingHr) {
      return res.status(409).send({ message: "HR with this email already exists." });
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
    const hr = {
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
    const createdHr = await Hr.create(hr);

    return res.status(201).send({ message: "HR created successfully!", data: createdHr });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Some error occurred!" });
  }
};

