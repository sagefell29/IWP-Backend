const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    type: {type: String, required: true, default: "doctor" },
  },
  {
    timestamps: true,
  }
);
const Doctor = mongoose.model("doctor", doctorSchema);
Doctor.createIndexes();
module.exports = Doctor;
