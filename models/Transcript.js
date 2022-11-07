const mongoose = require("mongoose");

const TranscriptSchema = mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  tstring: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  appointment: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model("transcript", TranscriptSchema);
