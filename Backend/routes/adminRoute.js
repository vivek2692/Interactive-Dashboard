const express = require("express");
const {
  AdminRegister,
  AdminLogin,
  AdminForgotPassword,
  AdminValidateOTP,
  AdminUpdatePassword,
  getAllStudents,
  postSelectStudent,
  patchUpdateStudent,
  AdminStats,
  postSelectFaculty,
  getAllFaculties,
  GetAllCoursera
} = require("../controllers/AdminController");
const adminController = require("../controllers/AdminController");
const router = express.Router();

router.post("/register", AdminRegister);
router.post("/login", AdminLogin);
router.post("/forgot-password", AdminForgotPassword);
router.post("/validateOTP", AdminValidateOTP);
router.patch("/update-password", AdminUpdatePassword);

//Admin-Student Routes
router.get("/all-students", getAllStudents)
router.post("/select-student", postSelectStudent);
router.patch("/update-student/:id", patchUpdateStudent);

//Admin-Faculty Routes
router.get("/all-faculties", getAllFaculties)
router.post("/select-faculty", postSelectFaculty);

//Admin Dashboard Routes
router.get("/stats", AdminStats)

//Admin Coursera
router.get("/coursera", GetAllCoursera);

module.exports = router;
