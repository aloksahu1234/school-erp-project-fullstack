const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Fee = require("../models/Fee");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const { student, feeType, amount, dueDate } = req.body;

    if (!student || !feeType || amount === undefined || !dueDate) {
      return res.status(400).json({
        msg: "student, feeType, amount and dueDate are required",
      });
    }

    if (!mongoose.isObjectIdOrHexString(student)) {
      return res.status(400).json({ msg: "Invalid student ID" });
    }

    const studentExists = await Student.findById(student);
    if (!studentExists) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const fee = await Fee.create({
      student,
      feeType,
      amount: Number(amount),
      dueDate,
      status: "pending",
    });

    res.status(201).json({ msg: "Fee created successfully", fee });
  } catch (error) {
    res.status(500).json({ msg: "Fee create failed", error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const now = new Date();

    await Fee.updateMany(
      { status: "pending", dueDate: { $lt: now } },
      { $set: { status: "due" } }
    );

    const fees = await Fee.find()
      .populate("student", "name rollNo class section")
      .sort({ createdAt: -1 });

    res.json(fees);
  } catch (error) {
    res.status(500).json({ msg: "Fees load failed", error: error.message });
  }
});

router.put("/:id/pay", auth, role("admin"), async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ msg: "Fee not found" });

    fee.status = "paid";
    fee.paymentDate = new Date();
    fee.receiptNumber = `REC-${Date.now()}`;

    await fee.save();

    res.json({ msg: "Payment marked as paid", fee });
  } catch (error) {
    res.status(500).json({ msg: "Payment update failed", error: error.message });
  }
});

router.put("/:id/due", auth, role("admin"), async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ msg: "Fee not found" });

    fee.status = "due";
    await fee.save();

    res.json({ msg: "Fee marked as due", fee });
  } catch (error) {
    res.status(500).json({ msg: "Due status update failed", error: error.message });
  }
});

module.exports = router;