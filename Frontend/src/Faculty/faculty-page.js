import React from "react";
import "./CSS/faculty.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FacultyTopBar from "./TopBar/faculty-topbar";
import FacultyNavBar from "./NavBar/faculty-navbar";
import FacultyAddStudent from "./Users/faculty-add-student";
import FacultyCoursera from "./Coursera details/faculty-coursera";
import FacultyCourseAssigner from "./Course Assigner/faculty-course-assigner";
import FacultyCourseForm from "./Course Assigner/faculty-course-form";
import FacultyStudentResult from "./Student Result/faculty-student-result";
import FacultyHome from "./Home/faculty-home";
import FacultyPlacement from "./Placement Details/faculty-placement-details";
import ViewPlacement from "./Placement Details/placement-info";
import FacultyPlacementForm from "./Placement Details/placement-form";
import FacultyStudents from "./Users/faculty-students";
import ViewStudent from "./Users/student-info";
import UpdateStudent from "../Admin/Students/update-student";
import FacultyEventManagement from "./Event Management/faculty-event-management";
import FacultyTalentHunt from "./Talent Hunt/faculty-talent-hunt";

function Faculty() {
  return (
    <div className="faculty-page">
      <Router>
        <FacultyNavBar />
        <FacultyTopBar />
        <Routes>
          <Route path="/faculty/home" element={<FacultyHome />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />
          <Route
            path="/faculty/students/add-student"
            element={<FacultyAddStudent />}
          />
          <Route
            path="/faculty/students/update-student/:id"
            element={<UpdateStudent />}
          />
          <Route path="/faculty/student/info/:id" element={<ViewStudent />} />
          <Route path="/faculty/courses" element={<FacultyCourseAssigner />} />
          <Route
            path="/faculty/placement-details"
            element={<FacultyPlacement />}
          />
          <Route
            path="/faculty/placement-details/placement-form"
            element={<FacultyPlacementForm />}
          />
          <Route
            path="/faculty/placement-details/student/:id"
            element={<ViewPlacement />}
          />
          <Route
            path="/faculty/student-result"
            element={<FacultyStudentResult />}
          />
          <Route
            path="/faculty/courses/student/:id"
            element={<FacultyCourseForm />}
          />
          <Route
            path="/faculty/coursera-details"
            element={<FacultyCoursera />}
          />
          <Route
            path="/faculty/event-registration"
            element={<FacultyEventManagement />}
          />
          <Route path="/faculty/talent-hunt" element={<FacultyTalentHunt />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Faculty;
