const express = require('express');
const { StudentRegister, StudentLogin, StudentForgotPassword, StudentValidateOTP, StudentUpdatePassword } = require('../controllers/StudentController.js');

const router = express.Router();

router.post('/register', StudentRegister);
router.post('/login', StudentLogin);
router.post('/forgot-password', StudentForgotPassword);
router.post('/validateOTP', StudentValidateOTP);
router.patch('/update-password', StudentUpdatePassword);

module.exports = router;
