const router = require('express').Router();
const patientController = require('../controllers/patientController');
const emergecyController = require('../controllers/emergengyController');


//creating a new patient
router.post('/createPatient', patientController.createPatient);

//home page
router.get('/', patientController.getAllPatients);

//emergency form
router.post('/emergency', emergecyController.emergency);
//emergency page 
router.get('/emergencyPage', emergecyController.EmergencyPatient);

module.exports = router;