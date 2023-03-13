const express = require('express');
const { FacultyRegister, FacultyLogin, FacultyForgotPassword, FacultyValidateOTP, FacultyUpdatePassword, AddSubjects, SubjectsAssign, GiveMarks, Searching } = require('../controllers/FacultyController');

const router = express.Router();

router.post('/register', FacultyRegister);
router.post('/login', FacultyLogin);
router.post('/forgot-password', FacultyForgotPassword);
router.post('/validateOTP', FacultyValidateOTP);
router.patch('/update-password', FacultyUpdatePassword);
router.post('/add-subject', AddSubjects);
router.post('/assign-subjects', SubjectsAssign);
router.post('/give-marks', GiveMarks);
router.get("/search", Searching);


module.exports = router;
