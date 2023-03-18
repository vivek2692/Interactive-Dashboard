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
  GetAllCoursera,
  SearchingCoursera,
  endSemMarks,
  patchUpdateFaculty,
  calculateSGPA,
  showBackLogStudents,
  getPalcementDetial,
} = require("../controllers/AdminController");
const adminController = require("../controllers/AdminController");
const router = express.Router();

router.post("/register", AdminRegister);
router.post("/login", AdminLogin);
router.post("/forgot-password", AdminForgotPassword);
router.post("/validateOTP", AdminValidateOTP);
router.patch("/update-password", AdminUpdatePassword);

//Admin-Student Routes
router.get("/all-students", getAllStudents);
router.post("/select-student", postSelectStudent);
router.patch("/update-student/:id", patchUpdateStudent);

//Admin-Faculty Routes
router.get("/all-faculties", getAllFaculties);
router.post("/select-faculty", postSelectFaculty);
router.patch("/update-faculty/:id", patchUpdateFaculty);

//Admin Dashboard Routes
router.get("/stats", AdminStats);

//Admin Coursera
router.get("/coursera", GetAllCoursera);
router.get("/search-coursera", SearchingCoursera);

//End Sem Marks
router.post("/final-marks", endSemMarks);
router.post("/generate-sgpa", calculateSGPA);

//backlog-show
router.post("/show-backlog", showBackLogStudents);

//show-placement
router.post("/show-placement", getPalcementDetial);
module.exports = router;
