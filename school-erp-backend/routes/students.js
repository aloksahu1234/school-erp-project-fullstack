const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Student = require("../models/Student");

// All logged-in users can view students
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
});

// Only admin can add a student
router.post("/", auth, admin, async (req, res) => {
  try {
    const {
      name,
      rollNo,
      class: className,
      section,
      guardianName,
      guardianPhone,
    } = req.body;

    const student = await Student.create({
      name,
      rollNo,
      class: className,
      section,
      guardianName,
      guardianPhone,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      msg: "Student add failed",
      error: error.message,
    });
  }
});

module.exports = router;