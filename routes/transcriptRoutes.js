const express = require('express')
const router = express.Router();
const transcriptController = require('../controllers/transcriptController')
const getPatient = require('../middlewares/getPatient')
const getDoctor = require('../middlewares/getDoctor')
router.post('/add', getPatient, transcriptController.addTranscript)
router.get('/get_for_doctor', getDoctor, transcriptController.getForDoctor)
router.get('/get_for_patient', getPatient, transcriptController.getForPatient)
module.exports = router