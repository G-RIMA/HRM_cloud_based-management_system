const express = require('express');
const app = express();

// Import and configure necessary middleware
app.use(express.json()); 

// Parse JSON request bodies
// Add other middleware as needed

//Routes

// Use routes as middleware

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



