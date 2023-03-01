const express = require('express');
const { FacultyRegister, FacultyLogin, FacultyForgotPassword, FacultyValidateOTP, FacultyUpdatePassword } = require('../controllers/FacultyController');

const router = express.Router();

router.post('/register', FacultyRegister);
router.post('/login', FacultyLogin);
router.post('/forgot-password', FacultyForgotPassword);
router.post('/validateOTP', FacultyValidateOTP);
router.patch('/update-password', FacultyUpdatePassword);

module.exports = router;
