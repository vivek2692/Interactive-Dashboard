const express = require("express");
const {
  AdminRegister,
  AdminLogin,
  AdminForgotPassword,
  AdminValidateOTP,
  AdminUpdatePassword,
  postSelectStudent,
  patchUpdateStudent,
} = require("../controllers/AdminController");
const adminController = require("../controllers/AdminController");
const router = express.Router();

router.post("/register", AdminRegister);
router.post("/login", AdminLogin);
router.post("/forgot-password", AdminForgotPassword);
router.post("/validateOTP", AdminValidateOTP);
router.patch("/update-password", AdminUpdatePassword);

//Admin-Student Routes
router.post("/select-student", postSelectStudent);
router.patch("/update-student", patchUpdateStudent);

module.exports = router;
