require('dotenv').config()
const Patient = require("../models/Patient");
const bcrypt = require('bcryptjs')
const JWT_SECRET = process.env.JWT_SECRET_KEY
const jwt = require('jsonwebtoken')

const createPatient = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const alreadyExist = await Patient.findOne({ email });
    if (alreadyExist) {
      return res.json({ success: false, message: "E-Mail already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const patient = await Patient.create({
      username: username,
      email: email,
      password: secPass,
    });
    if (!patient) {
      return res.json({ success: false, message: "Error creating account" });
    }
    res.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};

const loginPatient = async (req, res) => {
  try {
    const {email, password}= req.body
    const patient = await Patient.findOne({email})
    if(!patient){
        return res.json({success:false, message:"Account not exists"})
    }
    const matchPassword = await bcrypt.compare(password, patient.password);
    if(!matchPassword){
        return res.json({success:false, message:"Password doesnot matches"})
    }
    const data = {
        patient: {
            id: patient.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({success:true, message:"Login Successfully", token:authToken})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};

const getPatient = async(req, res)=>{
  try {
    const id = req.patient.id;
    const patient = await Patient.findOne({_id:id}).select('-password')
    if(!patient){
      return res.json({success:false, message:"No patient found"})
    }
    res.json({success:true, message:"Patient details found", data:patient})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
}
module.exports = { createPatient, loginPatient, getPatient };
