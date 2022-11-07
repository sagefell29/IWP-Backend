require("dotenv").config();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const createDoctor = async (req, res) => {
  try {
    const { username, email, password, specialization } = req.body;
    const alreadyExist = await Doctor.findOne({ email });
    if (alreadyExist) {
      return res.json({ success: false, message: "E-Mail already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const doctor = await Doctor.create({
      username: username,
      email: email,
      password: secPass,
      specialization: specialization,
    });
    if (!doctor) {
      return res.json({ success: false, message: "Error creating account" });
    }
    res.json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Account not exists" });
    }
    const matchPassword = await bcrypt.compare(password, doctor.password);
    if (!matchPassword) {
      return res.json({ success: false, message: "Password doesnot matches" });
    }
    const data = {
      doctor: {
        id: doctor.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({
      success: true,
      message: "Login Successfully",
      token: authToken,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};

const getDoctor = async (req, res) => {
  try {
    const id = req.doctor.id;
    const doctor = await Doctor.findOne({ _id: id }).select("-password");
    if (!doctor) {
      return res.json({ success: false, message: "No doctor found" });
    }
    res.json({ success: true, message: "Doctor details found", data: doctor });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};

const getDoctorBySpecialization = async (req, res) => {
  try {
    const {specialization} = req.body
    const doctors = await Doctor.find({specialization}).select('-password')
    if (!doctors){
        return res.json({success:false, message:"No doctors found"})
    }
    res.json({success:true, message:"Doctors found successfully", data:doctors})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Internal Server Error Occured" });
  }
};
module.exports = { createDoctor, loginDoctor, getDoctor, getDoctorBySpecialization };
