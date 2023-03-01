const express = require('express');
const { AdminRegister, AdminLogin, AdminForgotPassword, AdminValidateOTP, AdminUpdatePassword } = require('../controllers/AdminController');

const router = express.Router();

router.post('/register', AdminRegister);
router.post('/login', AdminLogin);
router.post('/forgot-password', AdminForgotPassword);
router.post('/validateOTP', AdminValidateOTP);
router.patch('/update-password', AdminUpdatePassword);

module.exports = router;
