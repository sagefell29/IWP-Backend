require("dotenv").config();
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const createAppointment = async (req,res) => {
    try {
        const {doctorname, email, date, time} = req.body;
        const alreadyexist = await Appointment.findOne({doctorname: doctorname, date: date, time: time});
        if (alreadyexist) {
            return res.json({success: false, message: "Slot already taken."});
        }
        const appointment = await Appointment.create({
            doctorname: doctorname,
            email: email,
            date: date,
            time: time
        });
        if (!appointment) {
            return res.json({success: false, message: "Could not create Appointment"})
        }
        res.json({success: true, message: "Appointment created successfully.", data:appointment});
    }
    catch (error) {
        console.log(error.message);
        res.json({success: false, message: "Internal Server Error Occurred"})
    }
};

const getAppointment = async (req,res) => {
    try {
        const appointments = await Appointment.find().select("-password");
        if (!appointments) {
            return res.json({success: false, message: "No appointments found"});
        }
        res.json({success: true, message: "Here are the records found", data: appointments});
    }
    catch (error) {
        console.log(error.message);
        res.json({success: false, message: "Internal Server Error Occurred"})
    }
};

module.exports = {
    createAppointment,
    getAppointment
};