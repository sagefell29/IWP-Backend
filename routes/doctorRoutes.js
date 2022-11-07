const express = require('express')
const router = express.Router();
const doctorController = require('../controllers/doctorController')
const getDoctor = require('../middlewares/getDoctor')

router.post('/registration', doctorController.createDoctor)
router.post('/login', doctorController.loginDoctor)
router.get('/get_doctor', getDoctor, doctorController.getDoctor)
router.post('/get_specialization', doctorController.getDoctorBySpecialization)
module.exports = router