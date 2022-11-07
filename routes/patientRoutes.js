const express = require('express')
const router = express.Router();
const patientController = require('../controllers/patientController')
const getPatient = require('../middlewares/getPatient')

router.post('/registration', patientController.createPatient)
router.post('/login', patientController.loginPatient)
router.get('/get', getPatient, patientController.getPatient)

module.exports = router