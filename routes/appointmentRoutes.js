const express = require('express')
const router = express.Router();
const appointmentController = require('../controllers/appointmentController')

router.post('/create',appointmentController.createAppointment);
router.get('/get', appointmentController.getAppointment);
module.exports = router;
