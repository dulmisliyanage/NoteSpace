require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to NoteSpace API!",
  });
});

// Notes API routes
app.use("/api/notes", noteRoutes);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
