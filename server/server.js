const express = require("express");
const app = express();
const PORT = 5000;

// Middleware to read JSON request bodies
app.use(express.json());

// Test API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to NoteSpace API!" });
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
