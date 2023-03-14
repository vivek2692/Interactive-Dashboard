const express = require("express");
const {
  FacultyRegister,
  FacultyLogin,
  FacultyForgotPassword,
  FacultyValidateOTP,
  FacultyUpdatePassword,
  AddSubjects,
  SubjectsAssign,
  GiveMarks,
  Searching,
  PlacementRegister,
  PostShowPlacedStudents,
  PatchPlacedStudents,
  getAllPlacements,
} = require("../controllers/FacultyController");

const router = express.Router();

router.post("/register", FacultyRegister);
router.post("/login", FacultyLogin);
router.post("/forgot-password", FacultyForgotPassword);
router.post("/validateOTP", FacultyValidateOTP);
router.patch("/update-password", FacultyUpdatePassword);
router.post("/add-subject", AddSubjects);
router.post("/assign-subjects", SubjectsAssign);
router.post("/give-marks", GiveMarks);
router.get("/search", Searching);
router.post("/placement/register", PlacementRegister);
router.post("/placement/fetch-students", PostShowPlacedStudents);
router.patch("/placement/update-students/:id", PatchPlacedStudents);
router.get("/placement/all-placements", getAllPlacements);

module.exports = router;
