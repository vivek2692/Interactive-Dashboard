const express = require('express');
const { AdminRegister, AdminLogin } = require('../controllers/AdminController');

const router = express.Router();

router.post('/register', AdminRegister);
router.post('/login', AdminLogin);

module.exports = router;
