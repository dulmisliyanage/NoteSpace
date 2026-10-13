require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to read JSON data
app.use(express.json());

// Test API endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to NoteSpace API!" });
});

// Connect to MongoDB before starting server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
