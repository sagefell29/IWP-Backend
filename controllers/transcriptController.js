require("dotenv").config();
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Transcript = require("../models/Transcript");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const addTranscript = async (req, res) => {
  try {
    const { tstring, result, doctorId, appointment } = req.body;
    const patientId = req.patient.id;
    const transcript = await Transcript.create({
      patient: patientId,
      doctor: doctorId,
      tstring: tstring,
      result: result,
      appointment: appointment,
    });
    if (!transcript) {
      return res.json({ success: false, message: "Error adding transcript" });
    }
    res.json({ success: true, message: "Transcript added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};

const getForPatient = async(req, res)=>{
    try {
        const patientId = req.patient.id
        const transcripts = await Transcript.find({patient:patientId})
        if(!transcripts){
            return res.json({success:false, message:"No transcripts found"})
        }
        res.json({success:true, message:"Transcripts found successfully", data:transcripts})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Internal Server Error Occured" });
    }
}

const getForDoctor = async(req, res)=>{
    try {
        const doctorId = req.doctor.id
        const transcripts = await Transcript.find({doctor:doctorId})
        if(!transcripts){
            return res.json({success:false, message:"No transcripts found"})
        }
        res.json({success:true, message:"Transcripts found successfully", data:transcripts})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Internal Server Error Occured" });
    }
}
module.exports = {addTranscript, getForDoctor, getForPatient}
