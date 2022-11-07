const mongoose = require("mongoose");
const patientSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true, default:"patient" },
  },
  {
    timestamps: true,
  }
);
const Patient = mongoose.model("patient", patientSchema);
Patient.createIndexes();
module.exports = Patient;
