const mongoose = require("mongoose");
const { Schema } = mongoose;
const certificateSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    assignDate: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamp: true }
);
const Certificate = mongoose.model("certificate", certificateSchema);
module.exports = Certificate;
