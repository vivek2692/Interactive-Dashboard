const express = require("express");
const {
  AdminRegister,
  AdminLogin,
  AdminForgotPassword,
  AdminValidateOTP,
  AdminUpdatePassword,
  postSelectStudent,
  patchUpdateStudent,
  deleteStudent,
  postSelectFaculty,
  patchUpdateFaculty,
  deleteFaculty,
  patchUpdateAdmin,
  deleteAdmin,
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
router.delete("/delete-student", deleteStudent);

//Admin-Faculty Routes
router.post("/select-faculty", postSelectFaculty);
router.patch("/update-faculty", patchUpdateFaculty);
router.delete("/delete-faculty", deleteFaculty);

//Admin-Admin
router.patch("/update-admin", patchUpdateAdmin);
router.delete("/delete-admin", deleteAdmin);

module.exports = router;
