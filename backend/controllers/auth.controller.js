const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models"); // Import your models here
const Hr = db.hr;
const Director = db.director;
const Employee = db.employee;


// Shared function for signup logic
exports.signup = async (userType, req, res) => {
  try {
    // Validate request
    if (!req.body) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Extract data from the request body
    const { first_name, last_name, email, password, hr_type, position, wage } = req.body;

    // Determine the model based on the userType
    let userModel;
    switch (userType) {
      case "Employee":
        userModel = Employee;
        break;
      case "Hr":
        userModel = Hr;
        break;
      case "Director":
        userModel = Director;
        break;
      default:
        return res.status(400).send({ message: "Invalid user type." });
    }

    // Check if user with the given email already exists
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: `${userType} with this email already exists.` });
    }

    // Create a new user instance with the hashed password
    const newUser = {
      first_name,
      last_name,
      email,
      password,
      hr_type,
      position,
      wage
    };

    // Save the user instance to the database
    const createdUser = await userModel.create(newUser);

    return res.status(201).send({ message: `${userType} created successfully!`, data: createdUser });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Some error occurred!" });
  }
};

exports.login = async (userType, req, res) => {
    try {
      const { email, password } = req.body;
  
      // Determine the model based on the userType
      let userModel;
      switch (userType) {
        case "Employee":
          userModel = Employee;
          break;
        case "Hr":
          userModel = Hr;
          break;
        case "Director":
          userModel = Director;
          break;
        default:
          return res.status(400).send({ message: "Invalid user type." });
      }
  
      // Check if user with the given email exists
      const user = await userModel.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ message: `${userType} not found.` });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password." });
      }
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ id: user.id }, "your_secret_key_here", { expiresIn: "1h" });
  
      // Return the token as part of the response
      return res.status(200).send({ message: "Login successful!", token });
    } catch (err) {
      return res.status(500).send({ message: err.message || "Some error occurred during login." });
    }
  };

