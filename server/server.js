require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Trust reverse proxy (required for rate limiter on Render) ──
app.set("trust proxy", 1);

// ── Rate limiter — 100 requests per 15 minutes per IP ─────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_ORIGIN,
].filter(Boolean) }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────
// Health check endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to NoteSpace API!",
  });
});

// Notes API routes
app.use("/api/notes", noteRoutes);

// ── Start server ───────────────────────────────────────────────
async function startServer() {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
