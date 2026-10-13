require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
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
