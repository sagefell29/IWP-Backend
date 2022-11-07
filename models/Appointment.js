const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema(
  {
    doctorname: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);
const Appointment = mongoose.model("appointment", appointmentSchema);
Appointment.createIndexes();
module.exports = Appointment;