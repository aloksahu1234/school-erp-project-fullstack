const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    feeType: {
      type: String,
      enum: ["tuition", "admission", "transport", "exam", "other"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "due"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: null,
    },
    receiptNumber: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fee", feeSchema);