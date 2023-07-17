const Company = require("../models/company.model");

// Create a new company and connect entities
exports.createCompany = (req, res) => {
  // Extract the necessary information from the request body
  const { name, hr, directors, employees } = req.body;

  // Create a new company object
  const company = new Company({ name, hr, directors, employees });

  // Save the company to the database and connect entities
  company.save((err, savedCompany) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: "Failed to create company" });
      return;
    }

    // Return the saved company object
    res.status(201).json({ company: savedCompany });
  });
};
