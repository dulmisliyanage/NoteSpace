const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");

const router = express.Router();

// GET /api/notes - Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("GET /api/notes error:", error.message);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// GET /api/notes/:id - Get a single note
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch note" });
  }
});

// POST /api/notes - Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body || {};
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to create note" });
  }
});

// PUT /api/notes/:id - Update a note
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const { title, content } = req.body || {};
    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      !title.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title;
    note.content = content;
    await note.save();

    res.json(note);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to update note" });
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

module.exports = router;
