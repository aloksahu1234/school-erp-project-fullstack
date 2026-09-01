const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be 6+ chars").isLength({ min: 6 }),
    body("role", "Invalid role")
      .optional()
      .isIn(["admin", "teacher", "student", "parent"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      user = new User({ name, email, password, role });
      await user.save();

      const payload = { user: { id: user.id, role: user.role } };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name, email, role } });
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const payload = { user: { id: user.id, role: user.role } };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }
);

module.exports = router;