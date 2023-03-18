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
  postAllPlacements,
  getPlacedStudentInfo,
  SearchPlacedStudents,
  midMarksEntry,
  internalPracMarksEntry,
  vivaMarksEntry,
  EnrolledStudents,
  FacultyStats,
  FacultyAllStudents,
  FacultyAllFaculties,
  postSelectStudent,
  SearchingFaculty,
  SearchingStudent,
  SearchStudentPlacement,
  GetCourses,
  getPlacedStudentInfoCollege,
  GetAllCoursera,
  GetFaculty,
  addNewEvent,
  deleteEvent,
  fetchEvent,
  searchSkill,
<<<<<<< Updated upstream
  BirthdayWish,
  SendWish,
=======
  BirthdayWishes,
>>>>>>> Stashed changes
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
router.post("/placement/all-placements-data", postAllPlacements);
router.get("/placement/placement-info/:id", getPlacedStudentInfo);
router.post(
  "/placement/placement-info-college/:id",
  getPlacedStudentInfoCollege
);
router.get("/placement/search", SearchPlacedStudents);
router.post("/placement/search-placement", SearchStudentPlacement);
router.post("/mid-marks", midMarksEntry);
router.post("/internal-prac", internalPracMarksEntry);
router.post("/viva-marks", vivaMarksEntry);
router.post("/get-enrolled-students", EnrolledStudents);
router.post("/stats", FacultyStats);

router.post("/all-students", FacultyAllStudents);
router.post("/all-faculties", FacultyAllFaculties);
router.post("/select-student", postSelectStudent);
router.post("/search-student", SearchingStudent);
router.post("/search-faculty", SearchingFaculty);
// router.post("/select-faculty", FacultyAllFaculties);

router.post("/getCourses", GetCourses);

// Coursera
router.post("/coursera", GetAllCoursera);
// router.get("/search-coursera", SearchingCoursera);

router.post("/getFaculty", GetFaculty);

//Event Management
router.post("/add-event", addNewEvent);
router.post("/delete-event", deleteEvent);
router.get("/fetch-event", fetchEvent);

//Skill-search
router.post("/search-skill", searchSkill);

<<<<<<< Updated upstream
//Birthday Wish
router.post("/birthday", BirthdayWish);
router.post("/sendWish", SendWish);
=======
// Get Birthday
router.get("/birthday", BirthdayWishes)
>>>>>>> Stashed changes

module.exports = router;
